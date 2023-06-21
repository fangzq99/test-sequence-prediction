import ast
import subprocess
import numpy as np
import pandas as pd
from collections import defaultdict

# np.random.seed(1)


def predict_next_state(current_state):
    # Get a list of possible next states
    next_states = [key[1] for key in transitions.keys() if key[0] == current_state]

    # If there are no next states in the data, return a message
    if not next_states:
        return False

    # Get corresponding probabilities
    next_probs = [transitions[(current_state, state)] for state in next_states]

    # Choose a next state
    next_state = np.random.choice(next_states, p=next_probs)

    # Print the probabilities of all possible next states
    print(
        f"\nPossible next states and their probabilities from the current state '{current_state}':"
    )
    for state, prob in zip(next_states, next_probs):
        print(f"State: {state}, Probability: {prob}")

    return next_state


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
                "modify_data.py",
            ]
        ).wait()

        # Launch the third subprocess
        subprocess.Popen(
            [
                "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
                "preprocessing_stopwords.py",
            ]
        ).wait()

        # Launch the fourth subprocess
        subprocess.Popen(
            [
                "C:\\Users\\fzq99\\OneDrive\\Desktop\\Projects\\Repositories\\capstone-project\\nlp\\py311venv\\Scripts\\python.exe",
                "preprocessing_stemming_lematizing.py",
            ]
        ).wait()
    except Exception as e:
        print("An error occurred during subprocess execution:", str(e))

    # Read the Excel file into a DataFrame
    sequence_run_df = pd.read_excel("sequence_runs.xlsx")

    # Let's assume that sequence_run_df is your DataFrame and "Sequence" is the column with sequences
    sequences = sequence_run_df["Sequence"].tolist()
    run_counts = sequence_run_df[
        "Run Count"
    ].tolist()  # fetch run counts from DataFrame

    # convert string representations of lists into actual lists
    sequences = [ast.literal_eval(seq) for seq in sequences]

    # Calculate transition probabilities
    transitions = defaultdict(int)
    for sequence, run_count in zip(
        sequences, run_counts
    ):  # consider run counts in transition calculation
        for i in range(len(sequence) - 1):
            transitions[(sequence[i], sequence[i + 1])] += run_count

    # Normalize to get probabilities
    state_totals = defaultdict(int)
    for (state, _), count in transitions.items():
        state_totals[state] += count

    for key, count in transitions.items():
        transitions[key] = count / state_totals[key[0]]  # normalize per each state

    # Testing
    current_state = "a1050"
    next_state = predict_next_state(current_state)
    if next_state == False:
        print(f"\nNo next state can be predicted from current state '{current_state}'.")
    else:
        print(
            f"\nCurrent state is {current_state}. Predicted next state is {next_state}."
        )
