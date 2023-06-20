import ast
import subprocess
import pandas as pd
from nltk.stem import PorterStemmer, SnowballStemmer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
import nltk

if __name__ == "__main__":
    # NOTE: These runs all previous steps
    try:
        # Launch the first subprocess
        subprocess.Popen(
            [
                "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
                "extractor.py",
            ]
        ).wait()

        # Launch the second subprocess
        subprocess.Popen(
            [
                "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
                "preprocessing_stopwords.py",
            ]
        ).wait()
    except Exception as e:
        print("An error occurred during subprocess execution:", str(e))

    # Read the Excel file into a DataFrame
    df_with_filtered_stop_words = pd.read_excel("preprocess_stopwords.xlsx")

    # Stemming with PorterStemmer
    stemmer = PorterStemmer()
    # Create a new column to store the stemmed words
    df_with_filtered_stop_words["Stemmed Test Names (Porter Stemmer)"] = ""
    # Iterate over each row and apply stemming
    for index, row in df_with_filtered_stop_words.iterrows():
        # Get the filtered words in the current row
        filtered_words = row["Stop Words Filtered"]
        # Convert the string representation of list to actual list
        filtered_words = ast.literal_eval(filtered_words)
        # Apply stemming
        stemmed_words = [stemmer.stem(word) for word in filtered_words]
        # Store the stemmed words in the new column
        df_with_filtered_stop_words.at[
            index, "Stemmed Test Names (Porter Stemmer)"
        ] = stemmed_words

    # Stemming with SnowballStemmer
    stemmer = SnowballStemmer("english")
    # Create a new column to store the stemmed words
    df_with_filtered_stop_words["Stemmed Test Names (Snowball Stemmer)"] = ""
    # Iterate over each row and apply stemming
    for index, row in df_with_filtered_stop_words.iterrows():
        # Get the filtered words in the current row
        filtered_words = row["Stop Words Filtered"]
        # Convert the string representation of list to actual list
        filtered_words = ast.literal_eval(filtered_words)
        # Apply stemming
        stemmed_words = [stemmer.stem(word) for word in filtered_words]
        # Store the stemmed words in the new column
        df_with_filtered_stop_words.at[
            index, "Stemmed Test Names (Snowball Stemmer)"
        ] = stemmed_words

    # Function to convert nltk POS tags to wordnet POS tags
    def nltk_tag_to_wordnet_tag(nltk_tag):
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

    # POS tagging and Lemmatization
    lemmatizer = WordNetLemmatizer()
    # Create a new column to store the POS tags and lemmatized words
    df_with_filtered_stop_words["POS Tags"] = ""
    df_with_filtered_stop_words["Lemmatized Test Names"] = ""
    # Iterate over each row and apply POS tagging and lemmatization
    for index, row in df_with_filtered_stop_words.iterrows():
        # Get the tokenized test names in the current row
        tokenized_test_names = row["Stop Words Filtered"]
        # Convert the string representation of list to actual list
        tokenized_test_names = ast.literal_eval(tokenized_test_names)

        # Apply POS tagging
        pos_tags = nltk.pos_tag(tokenized_test_names)
        # Store the POS tags in the new column
        df_with_filtered_stop_words.at[index, "POS Tags"] = pos_tags

        # Apply lemmatization with POS tagging
        lemmatized_words = []
        for word, nltk_tag in pos_tags:
            word = word.lower()
            wordnet_tag = nltk_tag_to_wordnet_tag(nltk_tag)
            if wordnet_tag is None:
                lemmatized_words.append(lemmatizer.lemmatize(word))
            else:
                lemmatized_words.append(lemmatizer.lemmatize(word, wordnet_tag))

        # Store the lemmatized words in the new column
        df_with_filtered_stop_words.at[
            index, "Lemmatized Test Names"
        ] = lemmatized_words

    # Save the updated DataFrame to a new Excel file
    df_with_filtered_stop_words.to_excel(
        "preprocess_stemming_lematizing.xlsx", index=False
    )
