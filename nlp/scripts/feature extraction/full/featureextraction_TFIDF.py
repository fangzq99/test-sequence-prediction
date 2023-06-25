import ast
import subprocess
import numpy as np
import pandas as pd
from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer

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
    tfidf_vectorizer_df = pd.read_excel(
        "../../manual labelling/full/manual_labelled.xlsx"
    )

    # Assume 'Lemmatized Test Names (Without POS)' is the column containing the lemmatized strings

    # Combine the strings in each row into a single string (if they're not already)
    tfidf_vectorizer_df["Lemmatized Test Names (Without POS)"] = tfidf_vectorizer_df[
        "Lemmatized Test Names (Without POS)"
    ].apply(lambda x: " ".join(ast.literal_eval(x)))

    # Initialize a TfidfVectorizer
    tfidf_vectorizer = TfidfVectorizer()

    # Fit and transform the vectorizer on the corpus
    tfidf_vectors = tfidf_vectorizer.fit_transform(
        tfidf_vectorizer_df["Lemmatized Test Names (Without POS)"]
    )

    # Convert the tf-idf vectors into a DataFrame for easier manipulation
    tfidf_df = pd.DataFrame(
        tfidf_vectors.toarray(), columns=tfidf_vectorizer.get_feature_names_out()
    )

    # Save the updated DataFrame to a new Excel file
    tfidf_df.to_excel("tfidf_vectorize.xlsx", index=False)
    print("\nData feature extracted and stored in tfidf_vectorize.xlsx successfully.")

    print(tfidf_df)
