import ast
import subprocess
import numpy as np
import pandas as pd
from collections import defaultdict
import seaborn as sns
import matplotlib.pyplot as plt


def predict_next_state(current_state):
    next_states = [key[1] for key in transitions.keys() if key[0] == current_state]
    if not next_states:
        return False
    next_probs = [transitions[(current_state, state)] for state in next_states]
    max_index = np.argmax(next_probs)
    next_state = next_states[max_index]
    sorted_states_probs = sorted(
        zip(next_states, next_probs), key=lambda x: x[1], reverse=True
    )
    print(
        f"\nPossible next states and their probabilities from the current state '{current_state}':"
    )
    for state, prob in sorted_states_probs:
        print(f"State: {state}, Probability: {prob}")
    return next_state


if __name__ == "__main__":
    sequence_run_df = pd.read_excel("../preprocessing/full/sequence_runs.xlsx")

    sequences = sequence_run_df["Sequence"].tolist()
    run_counts = sequence_run_df["Run Count"].tolist()

    sequences = [ast.literal_eval(seq) for seq in sequences]

    transitions = defaultdict(int)
    for sequence, run_count in zip(sequences, run_counts):
        for i in range(len(sequence) - 1):
            transitions[(sequence[i], sequence[i + 1])] += run_count

    state_totals = defaultdict(int)
    for (state, _), count in transitions.items():
        state_totals[state] += count

    for key, count in transitions.items():
        transitions[key] = count / state_totals[key[0]]

    print("The current referenced file is: sequence_runs.xlsx")
    current_state = input("State to be predicted next: ")
    next_state = predict_next_state(current_state)
    if next_state == False:
        print(f"\nNo next state can be predicted from current state '{current_state}'.")
    else:
        print(
            f"\nCurrent state is {current_state}. Predicted next state is {next_state}."
        )

    # Read the Excel file into a DataFrame
    df = pd.read_excel("../preprocessing/full/preprocess_stemming_lemmatizing.xlsx")
    # Get the list of unique states
    state_list = sorted(df["Unique Identifier"].unique())
    # Generate transition matrix
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
    plt.title("Visualization of Base Markov Chain State Transitions")
    plt.savefig("Visualization of markov chain state transitions")
    plt.show()
