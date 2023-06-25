import ast
import subprocess
import joblib
import numpy as np
import pandas as pd
from collections import defaultdict
from sklearn.feature_extraction.text import CountVectorizer
from joblib import dump, load

if __name__ == "__main__":
    # NOTE: These runs all previous steps
    # try:
    #     # Launch the first subprocess
    #     subprocess.Popen(
    #         [
    #             "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
    #             "extractor.py",
    #         ]
    #     ).wait()

    #     # Launch the second subprocess
    #     subprocess.Popen(
    #         [
    #             "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
    #             "modify_data.py",
    #         ]
    #     ).wait()

    #     # Launch the third subprocess
    #     subprocess.Popen(
    #         [
    #             "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
    #             "preprocessing_stopwords.py",
    #         ]
    #     ).wait()

    #     # Launch the fourth subprocess
    #     subprocess.Popen(
    #         [
    #             "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
    #             "preprocessing_stemming_lematizing.py",
    #         ]
    #     ).wait()
    # except Exception as e:
    #     print("An error occurred during subprocess execution:", str(e))

    # Read the Excel file into a DataFrame
    bow_df = pd.read_excel(
        "../../manual labelling/training/manual_labelled_training.xlsx"
    )

    # Assume 'Lemmatized Test Names (Without POS)' is the column containing the lemmatized strings

    # Combine the strings in each row into a single string (if they're not already)
    bow_df["Lemmatized Test Names (Without POS)"] = bow_df[
        "Lemmatized Test Names (Without POS)"
    ].apply(lambda x: " ".join(ast.literal_eval(x)))

    # Initialize a CountVectorizer (BoW model)
    count_vectorizer = CountVectorizer()

    # Fit and transform the vectorizer on the corpus
    bow_vectors = count_vectorizer.fit_transform(
        bow_df["Lemmatized Test Names (Without POS)"]
    )

    # Convert the BoW vectors into a DataFrame for easier manipulation
    bow_df = pd.DataFrame(
        bow_vectors.toarray(), columns=count_vectorizer.get_feature_names_out()
    )

    # Save the updated DataFrame to a new Excel file
    bow_df.to_excel("BoW_vectorize_training.xlsx", index=False)
    print(
        "\nData feature extracted and stored in BoW_vectorize_training.xlsx successfully."
    )

    print(bow_df)

    dump(count_vectorizer, "count_vectorizer_training.joblib")
