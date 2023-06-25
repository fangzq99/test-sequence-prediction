import csv
import datetime
import os
import random
import re
import pandas as pd
from nltk.tokenize import sent_tokenize, word_tokenize

if __name__ == "__main__":
    # Read the Excel file
    df = pd.read_excel(
        "../../preprocessing/training/preprocess_stemming_lemmatizing_training.xlsx"
    )

    # Get the index of the "Unique Identifier" column
    unique_identifier_index = df.columns.get_loc("Unique Identifier")

    # Add a new column called "Label" right beside "Unique Identifier"
    df.insert(unique_identifier_index + 1, "Category (Manual)", "")

    # # NOTE: This is manually labelled on the excel sheet, please adjust this accordingly if there is any change to the original dataset
    category_list = [
        "Robot",
        "Worksite",
        "Robot",
        "Deployment",
        "Robot",
        "Common",
        "Common",
        "Deployment",
        "Deployment",
        "Deployment",
        "Deployment",
        "Robot",
        "User",
        "Company",
        "User",
        "Company",
        "Worksite",
        "Robot",
        "Robot",
        "Robot",
        "Company",
        "Robot",
        "Robot",
        "Common",
        "Robot",
        "Robot",
        "Report",
        "Report",
        "Report",
        "Robot",
        "Schedule",
        "Robot",
        "Robot",
        "Robot",
        "Robot",
        "Robot",
        "Robot",
        "Robot",
        "Robot",
        "Company",
        "Deployment",
        "Deployment",
        "Robot",
        "Deployment",
        "Common",
        "User",
        "Robot",
        "Worksite",
        "Common",
        "Worksite",
    ]

    # Assign the values from category_list to the "Category" column
    df["Category (Manual)"] = category_list

    # Save the modified DataFrame to a new Excel file
    df.to_excel("manual_labelled_training.xlsx", index=False)

    print("Category added.")
