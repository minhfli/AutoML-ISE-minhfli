import os
from pathlib import Path
import splitfolders
import shutil


def split_data(input_folder: Path, output_folder, ratio=(0.8, 0.1, 0.1), seed=1337, group_prefix=None, move=False):
    """
    Splits a dataset into training, validation, and testing sets.

    Parameters:
    input_folder (str): Path to the dataset folder.
    output_folder (str): Path where the split datasets will be saved.
    ratio (tuple): A tuple representing the ratio to split (train, val, test).
    seed (int): Random seed for reproducibility.
    group_prefix (int or None): Prefix of group name to split files into different groups.
    move (bool): If True, move files instead of copying.

    Returns:
    None
    """
    try:
        splitfolders.ratio(input_folder, output=output_folder, seed=seed,
                           ratio=ratio, group_prefix=group_prefix, move=move)
        print("Data splitting completed successfully.")
    except Exception as e:
        print(f"An error occurred during data splitting: {e}")


def create_csv(directory: Path, output_file: Path):
    with open(output_file, mode='w') as f:
        f.write('image,label\n')
        for path, _, files in os.walk(directory):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                    label = Path(path).name
                    f.write(f"{os.path.join(path, file)},{label}\n")


def remove_folders_except(user_dataset_path: Path, keep_folder: str):
    """
    Removes all subdirectories in the given directory except the specified folder.

    Args:
        user_dataset_path (Path): The path to the user's dataset directory.
        keep_folder (str): The name of the folder to keep.
    """
    for item in user_dataset_path.iterdir():
        if item.is_dir() and item.name != keep_folder:
            shutil.rmtree(item)
            print(f"Removed {item.name}")


def create_folder(user_dataset_path: Path, folder_name: str):
    """
    Creates a folder in the user's dataset directory.

    Args:
        user_dataset_path (Path): The path to the user's dataset directory.
        folder_name (str): The name of the folder to create.
    """
    folder_path = user_dataset_path / folder_name
    if not folder_path.exists():
        folder_path.mkdir()
        print(f"Created {folder_name}")
