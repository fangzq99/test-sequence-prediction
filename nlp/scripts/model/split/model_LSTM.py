import ast
from keras.utils.data_utils import pad_sequences
import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM
import numpy as np
import os

model_filename = "lstm_model.h5"

# Prepare data
sequence_run_df = pd.read_excel("../../preprocessing/full/sequence_runs_split.xlsx")
sequences = sequence_run_df["Sequence"].tolist()
sequences = [ast.literal_eval(seq) for seq in sequences]

# Flatten the list of sequences and encode the states
states = [state for sequence in sequences for state in sequence]
le = LabelEncoder()
le.fit(states)

# Encode sequences
sequences = [le.transform(seq) for seq in sequences]

# Prepare inputs and outputs
X = []
y = []
for seq in sequences:
    for i in range(1, len(seq)):
        X.append(seq[:i])
        y.append(seq[i])
# count = 0
# for seq in X:
#     print(seq)
#     if count == 5:
#         break
#     else:
#         count += 1
# count = 0
# for seq in y:
#     print(seq)
#     if count == 5:
#         break
#     else:
#         count += 1
# input()

# Pad sequences so they all have the same length
X = pad_sequences(X)

# # One-hot encode targets
# y = to_categorical(y)

# One-hot encode targets
y = np.array(y).reshape(-1, 1)  # reshape y for OneHotEncoder
encoder = OneHotEncoder(sparse=False)
y = encoder.fit_transform(y)

count = 0
for seq in X:
    print(seq)
    if count == 5:
        break
    else:
        count += 1
count = 0
for seq in y:
    print(seq)
    if count == 5:
        break
    else:
        count += 1

# Split data into training and test set
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Check if the model file exists
if os.path.exists(model_filename):
    # Load the pre-trained model
    model = load_model(model_filename)
else:
    # LSTM model setup
    model = Sequential()
    model.add(LSTM(50, input_shape=(X_train.shape[1], 1)))
    model.add(Dense(y.shape[1], activation="softmax"))
    model.compile(
        loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"]
    )

    # Reshape input data to fit LSTM input requirements
    X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], 1))
    X_test = X_test.reshape((X_test.shape[0], X_test.shape[1], 1))

    # Train the model
    model.fit(X_train, y_train, epochs=20, verbose=1)

    # Save the trained model
    model.save(model_filename)

# # Test the model
accuracy = model.evaluate(X_test, y_test)
print(f"Accuracy: {accuracy[1]}")

# Prepare the input state
input_state = "a1022"  # Replace with your actual input state

# Encode the input state
input_state_encoded = le.transform([input_state])

# Reshape the input state
input_state_reshaped = np.reshape(input_state_encoded, (1, len(input_state_encoded)))

# Pad the input state
input_state_padded = pad_sequences([input_state_reshaped], maxlen=X.shape[1])

# Reshape the padded input state
input_state_final = np.reshape(input_state_padded, (1, X.shape[1], 1))

# Make the prediction
prediction = model.predict(input_state_final)

# Decode the prediction
predicted_state_encoded = np.argmax(prediction)
predicted_state = le.inverse_transform([predicted_state_encoded])

print("Input State:", input_state)
print("Predicted Next State:", predicted_state)
