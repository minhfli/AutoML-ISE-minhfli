from torch.utils.data import DataLoader, Dataset
import pandas as pd
from sklearn import preprocessing
import os
from torchvision.io import read_image
from torchvision import transforms


class ImageDataset(Dataset):
    def __init__(self, annotations_file, img_dir, transform=None, target_transform=None):
        self.img_labels = pd.read_csv(annotations_file)
        self.img_dir = img_dir
        self.transform = transform
        self.target_transform = target_transform

        self.label_encoder = preprocessing.LabelEncoder()
        self.img_labels.label = self.label_encoder.fit_transform(self.img_labels.label)
        print(self.img_labels.label.unique())

    def __len__(self):
        return len(self.img_labels)

    def __getitem__(self, idx):
        img_path = os.path.join(self.img_dir, self.img_labels.iloc[idx, 0])
        image = read_image(img_path)
        label = self.img_labels.iloc[idx, 1]
        if self.transform:
            image = self.transform(image)
        if self.target_transform:
            label = self.target_transform(label)
        return image, label


def get_dataloader(img_dir='./datasets/dataset_splits/', batch_size=64, img_size=(224, 224),
                   num_workers=0):
    data_transforms = {
        'train': transforms.Compose([
            transforms.ToPILImage(),
            transforms.RandomResizedCrop(img_size, (.5, 1.0), antialias=True),
            # transforms.RandomHorizontalFlip(p=0.5),
            # transforms.RandomVerticalFlip(p=0.5),
            # transforms.ColorJitter(brightness=0.2, contrast=0.1, saturation=0.1),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]),
        'val': transforms.Compose([
            transforms.ToPILImage(),
            transforms.Resize((int(img_size[0] * 8 / 7), int(img_size[1] * 8 / 7))),
            transforms.CenterCrop(img_size),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    train_dataset = ImageDataset(annotations_file=os.path.join(img_dir, 'train.csv'),
                                 img_dir=img_dir, transform=data_transforms['train'])
    val_dataset = ImageDataset(annotations_file=os.path.join(img_dir, 'val.csv'),
                               img_dir=img_dir, transform=data_transforms['val'])
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True,
                              num_workers=num_workers)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=True,
                            num_workers=num_workers)
    return train_loader, val_loader
