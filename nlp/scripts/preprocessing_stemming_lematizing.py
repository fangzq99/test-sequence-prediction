import ast
import subprocess
import pandas as pd
from nltk.stem import PorterStemmer, SnowballStemmer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
import nltk


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
    # except Exception as e:
    #     print("An error occurred during subprocess execution:", str(e))

    # Read the Excel file into a DataFrame
    modified_data_df = pd.read_excel("preprocess_stopwords.xlsx")

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
    lemmatized_df.to_excel("preprocess_stemming_lemmatizing.xlsx", index=False)
    print(
        "\nLemmatized/stemmed data stored in preprocess_stemming_lemmatizing.xlsx successfully."
    )
