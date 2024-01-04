import datetime
import os
import time

import torch
import torch.nn as nn
import numpy as np
import pandas as pd
import random
from tqdm import tqdm
from data.image_dataloader import get_dataloader
import timm
import torch.optim as optim
import _pickle as cPickle

from image_classifier.data.process_image import split_imagefolder


def set_seed(seed=None):
    if seed:
        np.random.seed(seed)
        random.seed(seed)
        torch.manual_seed(seed)
        torch.cuda.manual_seed(seed)
        return
    import time
    np.random.seed(int(time.time_ns() % (2 ** 32 - 1)))
    random.seed(int(time.time_ns() % (2 ** 32 - 1)))
    torch.manual_seed(int(time.time_ns() % (2 ** 32 - 1)))
    torch.cuda.manual_seed(int(time.time_ns() % (2 ** 32 - 1)))


class Trainer(object):
    """
    supports timm's models, look up here:
    https://github.com/huggingface/pytorch-image-models/blob/main/results/results-imagenet.csv ,
    or call timm.list_models(pretrained=True)
    """

    def __init__(self, dataset_folder='./datasets/flowers',
                 model_name='maxvit_tiny_tf_512.in1k', seed=None,
                 batch_size=32,
                 lr=1e-3, min_lr=1e-8, weight_decay=1e-5,
                 T_0=1, T_mult=1, num_workers=0,
                 chkpt_dir='./trained_models/', model_dir=None):

        train_df, valid_df, test_df = split_imagefolder(dataset_folder, './datasets/dataset_splits')
        set_seed(seed)
        num_classes = len(os.listdir(os.path.join('./datasets/dataset_splits', 'train')))
        self.model = timm.create_model(model_name, pretrained=True, num_classes=num_classes)
        img_size = self.model.default_cfg['input_size'][1:]
        self.train_loader, self.valid_loader = get_dataloader(
            './datasets/dataset_splits', batch_size=batch_size, img_size=img_size,
            num_workers=num_workers
        )
        self.optimizer = optim.SGD(self.model.parameters(), lr=lr, weight_decay=weight_decay)
        self.lr_schedule = optim.lr_scheduler.CosineAnnealingWarmRestarts(
            self.optimizer, T_0, T_mult, min_lr, -1)
        self.criterion = nn.CrossEntropyLoss()
        self.best_loss = np.inf
        if model_dir is not None:
            self.chkpt_dir = model_dir
            self.load_model()
            if self.best_loss < np.inf:
                print('Loaded checkpoint with %.2f validation loss' % self.best_loss)
        else:
            self.chkpt_dir = os.path.join(chkpt_dir, model_name + '_'
                                          + datetime.datetime.now().strftime('%y%m%d_%H%M%S'))

    def save_model(self, loss):
        os.makedirs(self.chkpt_dir, exist_ok=True)
        model_file = os.path.join(self.chkpt_dir, 'model.pkl')
        cPickle.dump((self.model, loss), open(model_file, 'wb'))

    def load_model(self):
        os.makedirs(self.chkpt_dir, exist_ok=True)
        model_file = os.path.join(self.chkpt_dir, 'model.pkl')
        if os.path.isfile(model_file):
            self.model, loss = cPickle.load(open(model_file, 'rb'))
            self.best_loss = loss

    def train_step(self, batch):
        img, labels = batch
        img = img.to('cuda')
        labels = labels.to('cuda')
        outputs = self.model(img)
        loss = self.criterion(outputs, labels)
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()
        _, preds = torch.max(outputs, 1)
        acc = torch.mean(preds == labels.data, dtype=torch.float16)
        return loss, acc

    def validate_step(self, batch):
        img, labels = batch
        img = img.to('cuda')
        labels = labels.to('cuda')
        with torch.no_grad():
            outputs = self.model(img)
            loss = self.criterion(outputs, labels)
            _, preds = torch.max(outputs, 1)
            acc = torch.mean(preds == labels.data, dtype=torch.float16)
        return loss, acc

    def train(self, time_limit=None, n_epochs=20):
        self.model.to('cuda')
        done = False
        time_elapsed = 0
        for epoch in range(n_epochs):
            loss_rec = []
            acc_rec = []
            n_iters = len(self.train_loader)
            curr_iter = 0
            self.model.train()
            curr_timer = time.time()
            for batch in (pbar := tqdm(self.train_loader)):
                self.lr_schedule.step(epoch + curr_iter / n_iters)
                curr_iter += 1
                loss, acc = self.train_step(batch)
                loss_rec += [loss.cpu().detach().numpy()]
                acc_rec += [acc.cpu().detach().numpy()]
                curr_elapsed = time.time() - curr_timer
                if time_limit and time_elapsed + curr_elapsed > time_limit:
                    print("Time limit reached. Elapsed time is %s. Signaling Trainer to stop." %
                          datetime.timedelta(seconds=int(time_elapsed + curr_elapsed)))
                    done = True
                    break

                pbar.set_description_str(
                    f'Train Step {epoch + 1}, lr={self.optimizer.state_dict()["param_groups"][0]["lr"]:.2e},' +
                    f'loss={loss_rec[-1]:.3f}, acc={acc_rec[-1] * 100:.2f}%')
            print(
                f'Train Step {epoch + 1}, train loss={np.average(loss_rec):.3f}, train accuracy={np.average(acc_rec) * 100:.2f}%')
            time_elapsed += time.time() - curr_timer
            loss_rec = []
            acc_rec = []
            self.model.eval()
            for batch in (pbar := tqdm(self.train_loader)):
                loss, acc = self.validate_step(batch)
                loss_rec += [loss.cpu().detach().numpy()]
                acc_rec += [acc.cpu().detach().numpy()]
                pbar.set_description_str(
                    f'Validate Step {epoch + 1},' +
                    f'loss={loss_rec[-1]:.3f}, acc={acc_rec[-1] * 100:.2f}%')
            print(
                f'Validate Step {epoch + 1}, validation loss={np.average(loss_rec):.3f}, validation accuracy={np.average(acc_rec) * 100:.2f}%')
            final_val_loss = np.average(loss_rec)
            if final_val_loss < self.best_loss:
                self.save_model(final_val_loss)
                print('New best model: %.3f -> %.3f' % (self.best_loss, final_val_loss))
                self.best_loss = final_val_loss
            else:
                print('Validation loss did not improve from %.3f, returning to last checkpoint...' % self.best_loss)
                self.load_model()
            if done:
                break


if __name__ == '__main__':
    trainer = Trainer(
        dataset_folder='./datasets/flowers',
        model_name='swin_small_patch4_window7_224',
        # Specify model dir if you want to continue from last checkpoint
        # model_dir='./trained_models/swin_small_patch4_window7_224_231207_123223',
        batch_size=16,
        lr=1e-2, min_lr=1e-6, weight_decay=1e-5,
        T_0=1, T_mult=2, num_workers=8)

    trainer.train(n_epochs=4, time_limit=80)
