import ast
import subprocess
import numpy as np
import pandas as pd
from collections import defaultdict
import matplotlib.pyplot as plt
import networkx as nx


def predict_next_state(current_state):
    next_states = [key[1] for key in transitions.keys() if key[0] == current_state]

    if not next_states:
        return False

    next_probs = [transitions[(current_state, state)] for state in next_states]

    next_state = np.random.choice(next_states, p=next_probs)

    print(
        f"\nPossible next states and their probabilities from the current state '{current_state}':"
    )
    for state, prob in zip(next_states, next_probs):
        print(f"State: {state}, Probability: {prob}")

    return next_state


def draw_graph(transitions, current_state, prob_threshold=0.05):
    G = nx.DiGraph()

    for (state1, state2), prob in transitions.items():
        if state1 == current_state and prob > prob_threshold:
            G.add_edge(state1, state2, weight=prob)

    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True, node_size=1400)  # Adjust node size here

    for (state1, state2), prob in transitions.items():
        if state1 == current_state and prob > prob_threshold:
            start_pos = pos[state1]
            end_pos = pos[state2]
            text_pos = [
                (start_pos[0] + end_pos[0]) / 2,
                (start_pos[1] + end_pos[1]) / 2,
            ]  # Midpoint of the edge
            plt.text(
                text_pos[0],
                text_pos[1],
                f"{prob:.5f}",
                horizontalalignment="center",
                verticalalignment="center",
            )

    plt.show()


def generate_transition_matrix(transitions):
    # Get list of unique states
    states = list(
        set(
            [key[0] for key in transitions.keys()]
            + [key[1] for key in transitions.keys()]
        )
    )

    # Create a matrix of zeroes with size (num_states, num_states)
    matrix = np.zeros((len(states), len(states)))

    # Create state index mapping
    state_index = {state: index for index, state in enumerate(states)}

    # Fill matrix with probabilities
    for (state1, state2), prob in transitions.items():
        matrix[state_index[state1], state_index[state2]] = prob

    # Create DataFrame with labels
    df = pd.DataFrame(matrix, index=states, columns=states)

    return df


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

    transition_matrix = generate_transition_matrix(transitions)
    print(transition_matrix)

    draw_graph(transitions, current_state)
