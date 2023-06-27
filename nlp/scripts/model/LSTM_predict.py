import ast
from keras.utils.data_utils import pad_sequences
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM
import numpy as np
import os

model_filename = "lstm_model.h5"

model = load_model(model_filename)


def predict_next_state(model, le, current_state):
    # Transform current state to fit model input
    sequence = [le.transform([current_state])]
    sequence = pad_sequences(sequence, maxlen=X_train.shape[1])
    sequence = np.array(sequence)
    sequence = sequence.reshape((sequence.shape[0], sequence.shape[1], 1))

    # Get model prediction
    prediction = model.predict(sequence)

    # Decode prediction
    predicted_index = np.argmax(prediction)
    predicted_state = le.inverse_transform([predicted_index])

    return predicted_state[0]


# Use the function
current_state = "a10123137"
next_state = predict_next_state(model, le, current_state)
print(f"The predicted next state after {current_state} is {next_state}")
