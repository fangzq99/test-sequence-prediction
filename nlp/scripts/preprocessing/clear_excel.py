import glob
import os

# Get the current working directory
current_directory = os.getcwd()

# Find all XLSX files in the current directory
xlsx_files = glob.glob(os.path.join(current_directory, "*.xlsx"))

# Delete each XLSX file
for file in xlsx_files:
    os.remove(file)
