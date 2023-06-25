import os
import shutil


def get_files(dir):
    for root, dirs, files in os.walk(dir):
        for name in files:
            yield os.path.relpath(os.path.join(root, name), dir)


master_dir = r"C:\Users\fzq99\OneDrive\Desktop\Projects\Repositories\capstone-project\nlp\scripts\data set\full"
compare_dir = r"C:\Users\fzq99\OneDrive\Desktop\Projects\Repositories\capstone-project\nlp\scripts\data set\training"
output_dir = r"C:\Users\fzq99\OneDrive\Desktop\Projects\Repositories\capstone-project\nlp\scripts\data set\testing"

master_files = set(get_files(master_dir))
compare_files = set(get_files(compare_dir))

missing_files = master_files - compare_files

for file in missing_files:
    src_path = os.path.join(master_dir, file)
    dest_path = os.path.join(output_dir, file)

    os.makedirs(os.path.dirname(dest_path), exist_ok=True)

    shutil.copy2(src_path, dest_path)
