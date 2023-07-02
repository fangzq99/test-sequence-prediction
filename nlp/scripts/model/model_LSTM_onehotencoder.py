import ast
from keras.utils.data_utils import pad_sequences
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM
from keras import layers
from keras.utils import to_categorical
from keras.optimizers import Adam
import numpy as np
import os
import matplotlib.pyplot as plt
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
)
from numpy import argmax
from sklearn.model_selection import train_test_split
import seaborn as sns

model_filename = "lstm_model.h5"

# Prepare data
sequence_run_df = pd.read_excel("../preprocessing/full/sequence_runs.xlsx")
sequences = sequence_run_df["Sequence"].tolist()
sequences = [ast.literal_eval(seq) for seq in sequences]

print("The pre-encoded data: ")
for i in range(len(sequences)):
    print(sequences[i])
    if i == 2:
        break

# Flatten the list of sequences and encode the states
states = [state for sequence in sequences for state in sequence]
le = LabelEncoder()
le.fit(states)

# Encode sequences
sequences = [le.transform(seq) for seq in sequences]

count = 0
print("The encoded data: ")
for i in sequences:
    print(i)
    if count == 2:
        break
    else:
        count += 1

# Prepare inputs and outputs
X = []
y = []
for seq in sequences:
    for i in range(1, len(seq)):
        X.append(seq[:i])
        y.append(seq[i])

# Pad sequences so they all have the same length
X = pad_sequences(X)

# NOTE: This step is what differs this code from the model_LSTM.py
# One-hot encode y and convert to numpy array
y = to_categorical(y)

print("\nThe padded + encoded data and their respective result:")
for i in range(len(X)):
    print(X[i], y[i])
    if i == 3:
        break


# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

n_features = 1
n_classes = len(le.classes_)

# Check if the model file exists
if os.path.exists(model_filename):
    # Load the pre-trained model
    model = load_model(model_filename)
else:
    # reshape from [samples, timesteps] into [samples, timesteps, features]
    X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], n_features))

    model = Sequential()
    model.add(
        layers.LSTM(50, activation="relu", input_shape=(X_train.shape[1], n_features))
    )
    model.add(layers.Dense(n_classes, activation="softmax"))
    model_layers = model.layers
    model.summary()

    # Create an optimizer with clipvalue
    opt = Adam(clipvalue=0.5)

    model.compile(
        optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
    )
    model.fit(X_train, y_train, epochs=50, verbose=1)
    model.save(model_filename)


def prepare_input_sequence(seq):
    # Encode the sequence
    encoded_seq = le.transform(seq)

    # Pad the sequence
    padded_seq = pad_sequences([encoded_seq], maxlen=X.shape[1])

    # Reshape the sequence
    reshaped_seq = padded_seq.reshape((1, padded_seq.shape[1], n_features))

    return reshaped_seq


# Test the function
input_sequence = [
    "a1037",
    # "a1022",
    # "a1061",
    # "a1038",
    # "a1024",
    # "a1054",
    # "a1051",
    # "a1003",
    # "a1059",
    # "a1063",
    # "a1071",
    # "a1017",
    # "a1035",
    # "a1068",
    # "a1010",
    # "a1018",
    # "a1012",
    # "a1016",
    # "a1033",
    # "a1077",
    # "a1075",
    # "a1053",
    # "a1080",
    # "a1074",
    # "a1020",
    # "a1047",
    # "a1036",
    # "a1000",
    # "a1073",
    # "a1040",
    # "a1056",
]
prepared_sequence = prepare_input_sequence(input_sequence)
probabilities = model.predict(prepared_sequence, verbose=1)[0]

# Print probabilities for each state
for state, prob in zip(le.classes_, probabilities):
    print(f"State: {state}, Probability: {prob}")

# Get the top 3 states with the highest probabilities
top_5_indices = np.argsort(probabilities)[-5:][::-1]
top_5_states = le.classes_[top_5_indices]
top_5_probs = probabilities[top_5_indices]

# Print the top 3 states with the highest probabilities
for i in range(5):
    print(f"\nRank {i+1} state: {top_5_states[i]}, Probability: {top_5_probs[i]}")

# Print probabilities for each state
states = le.classes_
probs = probabilities

plt.figure(figsize=(15, 10))
plt.bar(states, probs)
plt.title("Probability Distribution Across States")
plt.xlabel("States")
plt.ylabel("Probability")
plt.xticks(rotation=90)  # Rotate x-axis labels for better readability
plt.show()

# Get the top 5 states with the highest probabilities
top_5_indices = np.argsort(probabilities)[-5:][::-1]
top_5_states = states[top_5_indices]
top_5_probs = probabilities[top_5_indices]

# Plot the top 5 states with the highest probabilities
plt.figure(figsize=(10, 6))
plt.bar(top_5_states, top_5_probs)
plt.title("Top 5 States with Highest Probabilities")
plt.xlabel("States")
plt.ylabel("Probability")
plt.show()

# reshape X_test to be [samples, timesteps, features]
X_test_reshaped = X_test.reshape((X_test.shape[0], X_test.shape[1], n_features))

# make predictions
y_pred = model.predict(X_test_reshaped)

# convert data from one-hot encoding to class labels
y_test_class = np.argmax(y_test, axis=1)
y_pred_class = np.argmax(y_pred, axis=1)

# compute evaluation metrics
accuracy = accuracy_score(y_test_class, y_pred_class)
precision = precision_score(y_test_class, y_pred_class, average="macro")
recall = recall_score(y_test_class, y_pred_class, average="macro")
f1 = f1_score(y_test_class, y_pred_class, average="macro")

print(f"Accuracy: {accuracy}")
print(f"Precision: {precision}")
print(f"Recall: {recall}")
print(f"F1 Score: {f1}")

# confusion matrix
cm = confusion_matrix(y_test_class, y_pred_class)

# plot confusion matrix
plt.figure(figsize=(10, 10))
sns.heatmap(cm, fmt=".0f", linewidths=0.5, square=True, cmap="Blues")
plt.ylabel("Actual label")
plt.xlabel("Predicted label")

plt.title("Confusion Matrix", size=15)
plt.show()
