import ast
from keras.utils.data_utils import pad_sequences
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM
from keras import layers
import numpy as np
import os
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import matplotlib.pyplot as plt
from scipy import stats

model_filename = "lstm_model_noencoder.h5"

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

# Convert y to numpy array
y = np.array(y)

print("\nThe padded + encoded data and their respective result:")
for i in range(len(X)):
    print(X[i], y[i])
    if i == 10:
        break

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)  # 80-20 split

# Reshape the data for LSTM
n_features = 1
X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], n_features))
X_test = X_test.reshape((X_test.shape[0], X_test.shape[1], n_features))

# Check if the model file exists
history = None
if os.path.exists(model_filename):
    # Load the pre-trained model
    model = load_model(model_filename)
else:
    model = Sequential()
    model.add(
        layers.LSTM(100, activation="relu", input_shape=(X_train.shape[1], n_features))
    )
    model.add(layers.Dense(1))
    model.compile(
        optimizer="adam", loss="mean_squared_error", metrics=["mean_squared_error"]
    )

    # Train the model
    history = model.fit(X_train, y_train, epochs=200, verbose=1)

    # Save the trained model
    model.save(model_filename)

# Evaluate the model on the test data
loss, mse = model.evaluate(X_test, y_test, verbose=1)

# Make predictions on the test data
y_pred = model.predict(X_test)

# Visualizing the loss during training
if history is not None:
    plt.figure()
    plt.plot(history.history["loss"])
    plt.title("Model Loss")
    plt.ylabel("Loss")
    plt.xlabel("Epoch")
    plt.savefig("loss_plot.png")

# Visualizing the actual vs predicted values
# plt.figure()
# plt.plot(y_test, "b-", label="Actual")
# plt.plot(y_pred, "r-", label="Predicted")
# plt.title("Actual vs Predicted Values")
# plt.ylabel("Value")
# plt.xlabel("Index")
# plt.legend(loc="upper right")
# plt.savefig("actual_vs_predicted.png")

plt.figure(figsize=(10, 10))
plt.scatter(y_test, y_pred, c="crimson")
plt.yscale("log")
plt.xscale("log")
p1 = max(max(y_pred), max(y_test))
p2 = min(min(y_pred), min(y_test))
plt.plot([p1, p2], [p1, p2], "b-")
plt.xlabel("True Values", fontsize=15)
plt.ylabel("Predictions", fontsize=15)
plt.axis("equal")
plt.title("Predicted vs. True Values Scatter Plot")
plt.show()

# Histogram of residuals
residuals = y_test - y_pred.flatten()
plt.figure()
plt.hist(residuals, bins=20)
plt.title("Histogram of Residuals")
plt.xlabel("Residual Value")
plt.ylabel("Frequency")
plt.savefig("residuals_histogram.png")


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
]
prepared_sequence = prepare_input_sequence(input_sequence)
predictNextNumber = model.predict(prepared_sequence, verbose=1)

# Round and inverse transform the predicted number
predicted_state = le.inverse_transform([round(predictNextNumber[0, 0])])
print(
    f"\nExpected next state: {predicted_state} and its encoded number is: {predictNextNumber}"
)

# Create a dataframe with actual and predicted values
df = pd.DataFrame({"Actual": y_test.flatten(), "Predicted": y_pred.flatten()})

# Print the dataframe
print(df)

# Calculate and print statistical properties
mean_residuals = np.mean(residuals)
variance_residuals = np.var(residuals)
skewness_residuals = stats.skew(residuals)
kurtosis_residuals = stats.kurtosis(residuals)

print(f"Mean of residuals: {mean_residuals}")
print(f"Variance of residuals: {variance_residuals}")
print(f"Skewness of residuals: {skewness_residuals}")
print(f"Kurtosis of residuals: {kurtosis_residuals}")

print("END OF LINE")
