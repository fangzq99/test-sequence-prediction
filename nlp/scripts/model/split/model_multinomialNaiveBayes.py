import ast
import subprocess
import numpy as np
import pandas as pd
from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
from joblib import dump, load

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
    bow_df = pd.read_excel(
        "../../feature extraction/training/BoW_vectorize_training.xlsx"
    )

    preprocessed_set = pd.read_excel(
        "../../manual labelling/training/manual_labelled_training.xlsx"
    )

    X_train, X_test, y_train, y_test = train_test_split(
        bow_df,
        preprocessed_set["Category (Manual)"],
        test_size=0.2,
        random_state=42,
    )

    # Create a new Multinomial Naive Bayes classifier
    clf = MultinomialNB()

    # Train the classifier
    clf.fit(X_train, y_train)

    # Optionally, evaluate the classifier
    y_pred = clf.predict(X_test)
    print(classification_report(y_test, y_pred))

    # Save the trained model
    dump(clf, "naive_bayes_model.joblib")

    # Load the model when you need to make predictions
    clf = load("naive_bayes_model.joblib")

    test_data = pd.read_excel(
        "../../preprocessing/testing/preprocess_stemming_lemmatizing_testing.xlsx"
    )

    count_vectorizer = load(
        "../../feature extraction/training/count_vectorizer_training.joblib"
    )
    test_data_vector = count_vectorizer.transform(test_data)

    new_data_predictions = clf.predict(test_data_vector)
