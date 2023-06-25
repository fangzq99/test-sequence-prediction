import ast
import subprocess
import numpy as np
import pandas as pd
from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report

if __name__ == "__main__":
    # NOTE: These runs all previous steps
    # try:
    #     # Launch the fourth subprocess
    #     subprocess.Popen(
    #         [
    #             "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
    #             "../preprocessing.py",
    #         ]
    #     ).wait()
    # except Exception as e:
    #     print("An error occurred during subprocess execution:", str(e))

    # Read the Excel file into a DataFrame
    bow_df = pd.read_excel("../feature extraction/full/BoW_vectorize.xlsx")

    preprocessed_set = pd.read_excel("../manual labelling/full/manual_labelled.xlsx")

    X_train, X_test, y_train, y_test = train_test_split(
        bow_df,
        preprocessed_set["Category (Manual)"],
        test_size=0.2,
        random_state=42,
    )
