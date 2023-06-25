import ast
import datetime
import itertools
import random
import string
import subprocess
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import pandas as pd


random.seed(1)


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
    filtered_df_with_mock_up_time["Time Duration (s)"] = filtered_df_with_mock_up_time[
        "Time Duration (s)"
    ].apply(lambda x: x.total_seconds() // 60)

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
    # Set a seed value
    random.seed(1)

    # Generate random sequences of runs using unique identifiers
    # Limit the length of each sequence to 30identifiers
    sequence_runs = [
        random.sample(df["Unique Identifier"].tolist(), random.randint(3, 50))
        for _ in range(100)
    ]

    # Generate random run counts for each sequence
    # Increase the range to 1-100 to give more variation and reduce repetition
    run_counts = [random.randint(1, 100) for _ in range(100)]

    # Create a DataFrame to hold the mockup data
    sequence_run_df = pd.DataFrame({"Sequence": sequence_runs, "Run Count": run_counts})

    # Create a dictionary that maps unique identifiers to their corresponding time durations
    identifier_to_time = df.set_index("Unique Identifier")[
        "Time Duration (s)"
    ].to_dict()

    # Add a new column that contains the total time duration for each sequence
    sequence_run_df["Total Time Duration (s)"] = sequence_run_df["Sequence"].apply(
        lambda sequence: sum(identifier_to_time[identifier] for identifier in sequence)
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


if __name__ == "__main__":
    # NOTE: These runs all previous steps
    # subprocess.Popen(
    #     [
    #         "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
    #         "extractor.py",
    #     ]
    # ).wait()

    # Read the Excel file into a DataFrame
    extracted_data_df = pd.read_excel("extracted_data.xlsx")

    modified_excel_file_path = "modified_data.xlsx"

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
    sequence_run_df.to_excel("sequence_runs.xlsx", index=False)
    print(f"\nModified data stored in '{modified_excel_file_path}' successfully.")
    print(f"\nMockup sequence runs stored in 'sequence_runs.xlsx' successfully.")
