import ast
import csv
import datetime
import os
import random
import re
import string
import pandas as pd
import numpy as np
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, SnowballStemmer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
import nltk


# NOTE: Set the seed to ensure consistency when testing
np.random.seed(99)


def extract_test_info(file_name, file_content):
    # Extract test names and types from file content
    # print(f"Extracting test name data for file: {file_name}")
    test_names_data = []
    pattern = r"(context|it)\(['](.+?)[']"

    matches = re.findall(pattern, file_content)
    if matches:
        for match_tuples in matches:
            type, test_name = match_tuples

            # Append the test name with the current level
            test_names_data.append((type, test_name))
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
    """
    Data extraction
    """
    # Path to the directory containing the test files
    test_files_directory = "../../data set/testing/"

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
    excel_file_path = "raw_data_testing.xlsx"
    raw_test_df.to_excel(excel_file_path, index=False)

    print(f"\nRaw data stored in '{excel_file_path}' successfully.")

    filtered_excel_file_path = "extracted_data_testing.xlsx"
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

    """
    Data modification
    """

    def add_mockup_time(df):
        # Generate random time durations
        random_test_durations = [
            datetime.timedelta(minutes=random.randint(30, 360)) for _ in range(len(df))
        ]

        # Create a new DataFrame with the additional column
        filtered_df_with_mock_up_time = df.assign(
            **{"Time Duration (s)": random_test_durations}
        )

        # Convert timedeltas to string format
        filtered_df_with_mock_up_time[
            "Time Duration (s)"
        ] = filtered_df_with_mock_up_time["Time Duration (s)"].apply(
            lambda x: x.total_seconds() // 60
        )

        return filtered_df_with_mock_up_time

    def generate_unique_identifiers(df):
        # Get all the letters (a-z)
        letters = string.ascii_lowercase

        # Get all 4-digit numbers
        numbers = range(1000, 10000)  # Adjust this if you need more or less identifiers

        # Combine each letter with each number
        identifiers = [i + str(j) for i in letters for j in numbers]

        # Assign an identifier to each row
        df["Unique Identifier"] = identifiers[: len(df)]

        return df

    def remove_punctuation(df):
        # Punctuation removal
        # Create a new column to store the words without stop words and punctuation
        df["Tokenized Test Names Without Punctuation"] = ""

        # Iterate over each row and remove punctuation
        for index, row in df.iterrows():
            # Get the tokenized words from the previous step
            tokenized_words_str = row["Tokenized Test Name"]

            # Convert the string representation of list to actual list
            tokenized_words = ast.literal_eval(tokenized_words_str)

            # Remove punctuation and more specifically certain symbols like ` or "
            words_without_punctuation = [
                word
                for word in tokenized_words
                if word not in string.punctuation and word not in ["''", "``"]
            ]

            # Store the words without punctuation in the new column
            df.at[
                index, "Tokenized Test Names Without Punctuation"
            ] = words_without_punctuation

        return df

    def rearrange_columns(df, new_order):
        """
        This function reorders the columns in the DataFrame.

        Parameters:
        df (pd.DataFrame): The original DataFrame
        new_order (list): List of column names in the new order

        Returns:
        pd.DataFrame: A DataFrame with reordered columns
        """

        # Get the original order of columns
        original_order = df.columns.tolist()

        # Subtract new_order from original_order
        remaining_columns = [col for col in original_order if col not in new_order]

        # Concatenate new_order with remaining_columns
        final_order = new_order + remaining_columns

        # Reorder the columns in the DataFrame
        df = df[final_order]

        return df

    def generate_mockup_sequence_run(df):
        # Generate random sequences of runs using unique identifiers
        # Limit the length of each sequence to 30identifiers
        sequence_runs = [
            random.sample(df["Unique Identifier"].tolist(), random.randint(3, 30))
            for _ in range(100)
        ]

        # Generate random run counts for each sequence
        # Increase the range to 1-100 to give more variation and reduce repetition
        run_counts = [random.randint(1, 100) for _ in range(100)]

        # Create a DataFrame to hold the mockup data
        sequence_run_df = pd.DataFrame(
            {"Sequence": sequence_runs, "Run Count": run_counts}
        )

        # Create a dictionary that maps unique identifiers to their corresponding time durations
        identifier_to_time = df.set_index("Unique Identifier")[
            "Time Duration (s)"
        ].to_dict()

        # Add a new column that contains the total time duration for each sequence
        sequence_run_df["Total Time Duration (s)"] = sequence_run_df["Sequence"].apply(
            lambda sequence: sum(
                identifier_to_time[identifier] for identifier in sequence
            )
        )

        # Add new columns for time in minutes and hours
        sequence_run_df["Total Time Duration (min)"] = (
            sequence_run_df["Total Time Duration (s)"] / 60
        )
        sequence_run_df["Total Time Duration (hours)"] = (
            sequence_run_df["Total Time Duration (min)"] / 60
        )

        # Sort the DataFrame by Run Count in descending order
        sequence_run_df = sequence_run_df.sort_values(by="Run Count", ascending=False)

        # Add the "Top runs" column based on the run count
        sequence_run_df["Top Runs Ranking"] = sequence_run_df["Run Count"].rank(
            ascending=False, method="first"
        )

        return sequence_run_df

    # Read the Excel file into a DataFrame
    extracted_data_df = pd.read_excel("extracted_data_testing.xlsx")

    modified_excel_file_path = "modified_data_testing.xlsx"

    # Add mockup time to the extracted_data_df DataFrame using the add_mockup_time function
    modified_data_df = add_mockup_time(extracted_data_df)

    # Add unique identifiers to the DataFrame
    modified_data_df = generate_unique_identifiers(modified_data_df)

    # Remove the punctuatuation from the list of tokenized strings
    removed_punctuation_df = remove_punctuation(modified_data_df)

    # Reorganized the dataframe to make reading the tokenized data easier
    new_order = [
        "File Name without Extension and Suffix",
        "File Path",
        "Time Duration (s)",
        "Unique Identifier",
    ]
    removed_punctuation_df = rearrange_columns(removed_punctuation_df, new_order)

    # Generate a mockup DataFrame for sequence runs
    sequence_run_df = generate_mockup_sequence_run(removed_punctuation_df)

    # Save the modified DataFrame to an Excel file
    removed_punctuation_df.to_excel(modified_excel_file_path, index=False)
    sequence_run_df.to_excel("sequence_runs_testing.xlsx", index=False)
    print(f"\nModified data stored in '{modified_excel_file_path}' successfully.")
    print(
        f"\nMockup sequence runs stored in 'sequence_runs_testing.xlsx' successfully."
    )

    """
    Stopwords filtering
    """

    def remove_stop_words(df):
        # Get the list of stop words
        stop_words = set(stopwords.words("english"))

        # Create a new column to store the filtered words
        df["Stop Words Filtered"] = ""

        # Iterate over each row and filter out stop words
        for index, row in df.iterrows():
            # Get the tokenized words in the current row
            tokenized_words = row["Tokenized Test Names Without Punctuation"]

            # Convert the string representation of list to actual list
            tokenized_words = ast.literal_eval(tokenized_words)

            # Filter out stop words
            filtered_words = [
                word for word in tokenized_words if word.casefold() not in stop_words
            ]

            # Store the filtered words in the new column
            df.at[index, "Stop Words Filtered"] = filtered_words

        return df

    # Read the Excel file into a DataFrame
    filtered_df_with_mock_up_time = pd.read_excel("modified_data_testing.xlsx")

    # Call the function to remove stop words
    df_without_stop_words = remove_stop_words(filtered_df_with_mock_up_time)

    # Check if stop words have been removed
    column1_name = "Tokenized Test Names Without Punctuation"
    column2_name = "Stop Words Filtered"
    are_same = (
        df_without_stop_words[column1_name].values
        == df_without_stop_words[column2_name].values
    ).all()
    if are_same:
        print("Additional Check: Stop Words filtering may not be working")
    else:
        print("\nAdditional Check: Stop Words filtered")

    # Save the updated DataFrame to a new Excel file
    df_without_stop_words.to_excel("preprocess_stopwords_testing.xlsx", index=False)

    print(
        "\nFiltered stop words data stored in preprocess_stopwords_testing.xlsx successfully."
    )

    """
    Stemming/Lemmatizing
    """

    # Function to convert nltk POS tags to wordnet POS tags
    # NOTE: source: https://stackoverflow.com/questions/15586721/wordnet-lemmatization-and-pos-tagging-in-python
    def nltk_tag_to_wordnet_tag(nltk_tag):
        # Check the first letter of NLTK POS tag and return the corresponding wordnet POS tag
        if nltk_tag.startswith("J"):
            return wordnet.ADJ
        elif nltk_tag.startswith("V"):
            return wordnet.VERB
        elif nltk_tag.startswith("N"):
            return wordnet.NOUN
        elif nltk_tag.startswith("R"):
            return wordnet.ADV
        else:
            return None

    # Function to apply stemming on words and add a new column in the DataFrame with stemmed words
    def stem_words(df, stemmer_type, column_name):
        # Create an instance of the given stemmer type
        stemmer = stemmer_type
        # Create a new column in the DataFrame to store stemmed words
        df[column_name] = ""
        # Iterate over each row in the DataFrame
        for index, row in df.iterrows():
            # Convert the string representation of list to actual list
            filtered_words = ast.literal_eval(row["Stop Words Filtered"])
            # Apply stemming on the filtered words
            stemmed_words = [stemmer.stem(word) for word in filtered_words]
            # Store the stemmed words in the new column in the DataFrame
            df.at[index, column_name] = stemmed_words
        return df  # return the updated DataFrame

    # Function to apply lemmatization on words and add new columns in the DataFrame with lemmatized words
    def lemmatize(df, lemmatizer):
        df["Lemmatized Test Names (With POS)"] = ""
        df["Lemmatized Test Names (Without POS)"] = ""
        df["POS Tags"] = ""
        for index, row in df.iterrows():
            tokenized_test_names = ast.literal_eval(row["Stop Words Filtered"])
            pos_tags = nltk.pos_tag(tokenized_test_names)
            lemmatized_words_with_pos = []
            lemmatized_words_without_pos = []
            for word, nltk_tag in pos_tags:
                word = word.lower()
                wordnet_tag = nltk_tag_to_wordnet_tag(nltk_tag)
                if wordnet_tag is None:
                    lemmatized_words_with_pos.append(lemmatizer.lemmatize(word))
                    lemmatized_words_without_pos.append(lemmatizer.lemmatize(word))
                else:
                    lemmatized_words_with_pos.append(
                        lemmatizer.lemmatize(word, wordnet_tag)
                    )
                    lemmatized_words_without_pos.append(lemmatizer.lemmatize(word))
            df.at[index, "Lemmatized Test Names (With POS)"] = lemmatized_words_with_pos
            df.at[
                index, "Lemmatized Test Names (Without POS)"
            ] = lemmatized_words_without_pos
            df.at[index, "POS Tags"] = pos_tags
        return df

    # Read the Excel file into a DataFrame
    modified_data_df = pd.read_excel("preprocess_stopwords_testing.xlsx")

    # Apply Porter Stemming and Snowball Stemming
    porterstemmer_df = stem_words(
        modified_data_df, PorterStemmer(), "Stemmed Test Names (Porter Stemmer)"
    )
    snowballstemmer_df = stem_words(
        porterstemmer_df,
        SnowballStemmer("english"),
        "Stemmed Test Names (Snowball Stemmer)",
    )

    # Apply Lemmatization
    lemmatized_df = lemmatize(snowballstemmer_df, WordNetLemmatizer())

    # Save the updated DataFrame to a new Excel file
    lemmatized_df.to_excel("preprocess_stemming_lemmatizing_testing.xlsx", index=False)
    print(
        "\nLemmatized/stemmed data stored in preprocess_stemming_lemmatizing_testing.xlsx successfully."
    )
