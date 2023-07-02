import ast
import subprocess
import numpy as np
import pandas as pd
from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import seaborn as sns
import matplotlib.pyplot as plt

# np.random.seed(1)

# # assume you have a dictionary where the keys are states and the values are the associated words
# state_to_words = {
#     "a1001": ["login", "user", "fail"],
#     "a1002": ["login", "user", "pass"],
#     # add other states here
# }

# Read the Excel file
df = pd.read_excel("../preprocessing/full/preprocess_stemming_lemmatizing.xlsx")

# Initialize a defaultdict of lists
state_to_words = defaultdict(list)

# Group the tokenized words by their associated states
for _, row in df.iterrows():
    state = row["Unique Identifier"]
    words = row["Lemmatized Test Names (With POS)"].split()
    state_to_words[state].extend(words)

# Convert the defaultdict back to a dict
state_to_words = dict(state_to_words)
# for state, words in state_to_words.items():
#     print(f"State: {state}")
#     print(f"Words: {words}\n")

# input()

vectorizer = TfidfVectorizer().fit(
    sum(state_to_words.values(), [])
)  # fit TF-IDF on all words


def calculate_similarity(state1, state2):
    words1 = state_to_words[state1]
    words2 = state_to_words[state2]

    # transform the lists of words into TF-IDF vectors
    tfidf1 = vectorizer.transform([" ".join(words1)])
    tfidf2 = vectorizer.transform([" ".join(words2)])

    # calculate the cosine similarity between the two vectors
    similarity = cosine_similarity(tfidf1, tfidf2)[0, 0]

    return similarity


def predict_next_state(current_state):
    # Get a list of possible next states
    next_states = [key[1] for key in transitions.keys() if key[0] == current_state]

    # If there are no next states in the data, return a message
    if not next_states:
        return False

    # Get corresponding probabilities
    next_probs = [transitions[(current_state, state)] for state in next_states]

    # Choose a next state
    max_index = np.argmax(next_probs)
    next_state = next_states[max_index]

    # Sort states and probabilities by descending order of probabilities
    sorted_states_probs = sorted(
        zip(next_states, next_probs), key=lambda x: x[1], reverse=True
    )

    # Print the probabilities of all possible next states
    print(
        f"\nPossible next states and their probabilities from the current state '{current_state}':"
    )
    for state, prob in sorted_states_probs:
        print(f"State: {state}, Probability: {prob}")

    return next_state


if __name__ == "__main__":
    sequence_run_df = pd.read_excel("../preprocessing/full/sequence_runs.xlsx")
    sequences = sequence_run_df["Sequence"].tolist()

    sequences = [ast.literal_eval(seq) for seq in sequences]

    transitions = defaultdict(int)
    for sequence in sequences:
        for i in range(len(sequence) - 1):
            transitions[(sequence[i], sequence[i + 1])] += 1

    for (state1, state2), count in transitions.items():
        similarity = calculate_similarity(state1, state2)
        transitions[(state1, state2)] = count * similarity

    state_totals = defaultdict(int)
    for (state, _), count in transitions.items():
        state_totals[state] += count

    for key, count in transitions.items():
        transitions[key] = count / state_totals[key[0]]

    # Testing
    print("The current referenced file is: sequence_runs.xlsx")
    current_state = input("State to be predicted next: ")
    next_state = predict_next_state(current_state)
    if next_state == False:
        print(f"\nNo next state can be predicted from current state '{current_state}'.")
    else:
        print(
            f"\nCurrent state is {current_state}. Predicted next state is {next_state}."
        )

    # Generate transition matrix
    state_list = sorted(list(state_to_words.keys()))
    transition_matrix = []
    for state1 in state_list:
        row = []
        for state2 in state_list:
            if (state1, state2) in transitions:
                row.append(transitions[(state1, state2)])
            else:
                row.append(0)
        transition_matrix.append(row)

    # Visualize as heatmap
    plt.figure(figsize=(10, 10))
    sns.heatmap(transition_matrix, xticklabels=state_list, yticklabels=state_list)
    plt.title("Visualization of Modified Markov Chain State Transitions")
    plt.show()
