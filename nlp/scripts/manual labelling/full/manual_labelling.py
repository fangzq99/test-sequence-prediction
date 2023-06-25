import csv
import datetime
import os
import random
import re
import pandas as pd
from nltk.tokenize import sent_tokenize, word_tokenize

if __name__ == "__main__":
    # Read the Excel file
    df = pd.read_excel("../../preprocessing/full/preprocess_stemming_lemmatizing.xlsx")

    # Get the index of the "Unique Identifier" column
    unique_identifier_index = df.columns.get_loc("Unique Identifier")

    # Add a new column called "Label" right beside "Unique Identifier"
    df.insert(unique_identifier_index + 1, "Category (Manual)", "")

    # # NOTE: This is manually labelled on the excel sheet, please adjust this accordingly if there is any change to the original dataset
    category_list = [
        "Robot",
        "User",
        "Robot",
        "Deployment",
        "Robot",
        "User",
        "Common",
        "Common",
        "Company",
        "Common",
        "Common",
        "Deployment",
        "Deployment",
        "Worksite",
        "Company",
        "Deployment",
        "Deployment",
        "Worksite",
        "Worksite",
        "Robot",
        "User",
        "Common",
        "Company",
        "Company",
        "Company",
        "Worksite",
        "Robot",
        "Report",
        "Robot",
        "Robot",
        "Company",
        "Robot",
        "Robot",
        "Robot",
        "Worksite",
        "Worksite",
        "Common",
        "Robot",
        "Robot",
        "Robot",
        "Report",
        "Report",
        "Report",
        "Report",
        "Report",
        "Report",
        "Robot",
        "Robot",
        "Robot",
        "Robot",
        "Schedule",
        "User",
        "Robot",
        "Common",
        "Robot",
        "Robot",
        "Robot",
        "User",
        "Robot",
        "Robot",
        "Robot",
        "Robot",
        "Company",
        "Company",
        "Deployment",
        "Deployment",
        "Deployment",
        "Deployment",
        "Deployment",
        "Robot",
        "Deployment",
        "Common",
        "User",
        "Common",
        "Robot",
        "Common",
        "Worksite",
        "Common",
        "Worksite",
        "Company",
        "Robot",
    ]

    # Assign the values from category_list to the "Category" column
    df["Category (Manual)"] = category_list

    # Save the modified DataFrame to a new Excel file
    df.to_excel("manual_labelled.xlsx", index=False)

    print("Category added.")
