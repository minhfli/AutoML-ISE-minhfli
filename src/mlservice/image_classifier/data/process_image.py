import pandas as pd
import os
import splitfolders
import random

def prepare_imagefolder(input, output='./dataset_splits/'):
    if not os.path.isdir(output):
        print('splitting...')
        splitfolders.ratio(input, output=output,
                           seed=random.randint(int(-2e19), int(2e19)),
                           ratio=(0.7, 0.15, 0.15))

    df_train = []
    df_valid = []
    df_test = []
    for dir_paths, dir_names, file_names in os.walk(output):
        if 'train/' in dir_paths:
            class_name = os.path.basename(dir_paths)
            for file_name in file_names:
                full_file_name = os.path.join(dir_paths, file_name)
                # print(class_name + ": " + full_file_name)
                df_train += [[os.path.abspath(full_file_name), class_name]]
        if 'val/' in dir_paths:
            class_name = os.path.basename(dir_paths)
            for file_name in file_names:
                full_file_name = os.path.join(dir_paths, file_name)
                # print(class_name + ": " + full_file_name)
                df_valid += [[os.path.abspath(full_file_name), class_name]]
        if 'test/' in dir_paths:
            class_name = os.path.basename(dir_paths)
            for file_name in file_names:
                full_file_name = os.path.join(dir_paths, file_name)
                # print(class_name + ": " + full_file_name)
                df_test += [[os.path.abspath(full_file_name), class_name]]

    df_train = pd.DataFrame(df_train, columns=['image', 'label'])
    df_train.to_csv(os.path.join(output, 'train.csv'), index=False)
    df_valid = pd.DataFrame(df_valid, columns=['image', 'label'])
    df_valid.to_csv(os.path.join(output, 'valid.csv'), index=False)
    df_test = pd.DataFrame(df_test, columns=['image', 'label'])
    df_test.to_csv(os.path.join(output, 'test.csv'), index=False)

    return df_train, df_valid, df_test