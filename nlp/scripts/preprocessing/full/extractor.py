import csv
import datetime
import os
import random
import re
import pandas as pd
from nltk.tokenize import sent_tokenize, word_tokenize


def extract_test_info(file_name, file_content):
    # Extract test names and types from file content
    # print(f"Extracting test name data for file: {file_name}")
    test_names_data = []
    pattern = r"(context|it)\(['](.+?)[']"

    matches = re.findall(pattern, file_content)
    # BUG: this doesnt work correctly
    # Track the current level
    # current_context_level = 0
    # current_it_level = 1
    # previous_context_level = 0
    if matches:
        for match_tuples in matches:
            type, test_name = match_tuples

            # BUG: this doesnt work correctly
            # # Check if it's a context
            # if type == "context":
            #     current_context_level += 1
            # if current_context_level != 1:
            #     if current_context_level == previous_context_level:
            #         # Check if it's a it
            #         if type == "it":
            #             current_it_level += 1
            #     else:
            #         current_it_level == 1

            # Append the test name with the current level
            test_names_data.append((type, test_name))

            # BUG: this doesnt work correctly
            # previous_context_level = current_context_level
    return test_names_data


def collect_test_data(test_files_locations):
    # Collect test names and types from all files
    all_test_names_data = []
    for file_path in test_files_locations:
        # Remove the path e.g. test files/Smoke Tests/Dashboard Check/Companies/Worksites Section Info.cy.js to Worksites Section Info.cy.js
        file_name = os.path.basename(file_path)
        file_name_without_extension = os.path.splitext(file_name)[0]
        file_name_without_extension_and_suffix = os.path.splitext(
            file_name_without_extension
        )[0]
        with open(file_path, "r") as file:
            file_content = file.read()
        test_names_data = extract_test_info(file_path, file_content)
        test_names_data_with_file = [
            (file_name, file_name_without_extension_and_suffix, *data, file_path)
            for data in test_names_data
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
# test_names_data = extract_test_info(file_content) # NOTE: test_names_data is a list of tuple

# NOTE: debugging purposes
# Print the test names with indicators
# for type, test_name in test_names_data:
#     print(type + ':', test_name)

if __name__ == "__main__":
    current_context_level = 0
    current_it_level = 1
    previous_context_level = 0

    # Path to the directory containing the test files
    test_files_directory = "../data set/"

    # Get the list of files in the directory and its subdirectories
    test_files_locations = []
    for root, _, files in os.walk(test_files_directory):
        for file_name in files:
            file_path = os.path.join(root, file_name)
            file_path = file_path.replace("\\", "/")
            test_files_locations.append(file_path)

    # Get test datas in list of tuples
    test_data = collect_test_data(test_files_locations)

    # Convert test data to a Pandas DataFrame
    raw_test_df = pd.DataFrame(
        test_data,
        columns=[
            "File Name",
            "File Name without Extension and Suffix",
            "Type",
            "Test Name",
            # "Context Level",
            # "it Current Level",
            "File Path",
        ],
    )

    # Grouping the data by the file names and joining all the test names under the same file into a string
    filtered_data_df = (
        raw_test_df.groupby("File Name")
        .agg(
            {
                "Test Name": " ".join,
                "File Name without Extension and Suffix": "first",
                "File Path": "first",
            }
        )
        .reset_index()
    )

    # Reorder the columns
    filtered_data_df = filtered_data_df[
        [
            "File Name",
            "File Name without Extension and Suffix",
            "Test Name",
            "File Path",
        ]
    ]

    # Drop the "File Name" column
    filtered_data_df = filtered_data_df.drop("File Name", axis=1)

    # Save DataFrame as an Excel file
    excel_file_path = "raw_data.xlsx"
    raw_test_df.to_excel(excel_file_path, index=False)

    print(f"\nRaw data stored in '{excel_file_path}' successfully.")

    filtered_excel_file_path = "extracted_data.xlsx"
    # NOTE: The following df is the filtered data pre-tokenizing
    # filtered_data_df.to_excel(filtered_excel_file_path, index=False)

    print(f"\nFiltered data stored in '{filtered_excel_file_path}' successfully.")

    # Tokenize test names
    filtered_data_df["Tokenized Test Name"] = filtered_data_df["Test Name"].apply(
        lambda x: word_tokenize(x)
    )
    filtered_data_df.to_excel(filtered_excel_file_path, index=False)

    # NOTE: For debugging purposes
    # Print the updated DataFrame
    # print(f"\n{filtered_df_with_mock_up_time}")
