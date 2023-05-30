import csv
import os
import re
import pandas as pd
from nltk.tokenize import sent_tokenize, word_tokenize


def extract_test_names_types(file_name, file_content):
    # Extract test names and types from file content
    print(f"Extracting test name data for file: {file_name}")
    test_names_data = []
    pattern = r"(context|it)\(['\"]([^'\"]+)['\"]"

    matches = re.findall(pattern, file_content)
    # if matches:
    #     for match_tuples in matches:
    #         type, test_name = match_tuples
    #         test_names_data.append((type, test_name))
    # Track the current level
    current_level = 0
    if matches:
        for match_tuples in matches:
            type, test_name = match_tuples

            # Check if it's a context
            if type == "context":
                current_level += 1

            # Append the test name with the current level
            test_names_data.append((type, test_name, current_level))
    return test_names_data


def collect_test_data(test_files_locations):
    # Collect test names and types from all files
    all_test_names_data = []
    for file_name in test_files_locations:
        file_path = os.path.join(test_files_directory, file_name)
        with open(file_path, "r") as file:
            file_content = file.read()
        test_names_data = extract_test_names_types(file_name, file_content)
        test_names_data_with_file = [
            (file_name, *data, file_path) for data in test_names_data
        ]
        all_test_names_data.extend(test_names_data_with_file)

    print(f"\nData extraction successful.")
    return all_test_names_data


# NOTE: debugging purposes
# # Print the literal multiline string
# print('"""')
# print(file_content)
# print('"""')

# NOTE: debugging purposes
# # Extract test names with indicators
# test_names_data = extract_test_names_types(file_content) # NOTE: test_names_data is a list of tuple

# NOTE: debugging purposes
# Print the test names with indicators
# for type, test_name in test_names_data:
#     print(type + ':', test_name)

if __name__ == "__main__":
    # Path to the directory containing the test files
    test_files_directory = "test files/"

    # Get the list of files in the directory
    file_names = os.listdir(test_files_directory)

    # Get test datas in list of tuples
    test_data = collect_test_data(file_names)

    # Convert test data to a Pandas DataFrame
    df = pd.DataFrame(
        test_data, columns=["File Names", "Level", "Type", "Test Name", "File Paths"]
    )

    # Save DataFrame as an Excel file
    excel_file_path = "test_names_raw_database.xlsx"
    df.to_excel(excel_file_path, index=False)

    print(f"\nData stored in '{excel_file_path}' successfully.")
