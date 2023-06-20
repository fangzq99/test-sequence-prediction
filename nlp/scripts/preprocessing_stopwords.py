import ast
import datetime
import random
import string
import subprocess
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import pandas as pd


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


if __name__ == "__main__":
    # # NOTE: These runs all previous steps
    # subprocess.Popen(
    #     [
    #         "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
    #         "extractor.py",
    #     ]
    # ).wait()

    # Read the Excel file into a DataFrame
    filtered_df_with_mock_up_time = pd.read_excel("modified_data.xlsx")

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
        print("Stop Words filtering may not be working")
    else:
        print("\nStop Words filtered")

    # Save the updated DataFrame to a new Excel file
    df_without_stop_words.to_excel("preprocess_stopwords.xlsx", index=False)
