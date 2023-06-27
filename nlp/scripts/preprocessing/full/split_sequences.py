import pandas as pd

# Read the data from the Excel file
df = pd.read_excel("sequence_runs.xlsx")

# Get the sequence and run count columns
sequence = df["Sequence"].tolist()
run_count = df["Run Count"].tolist()

# Repeat the sequence based on the run count
repeated_sequence = []
for seq, count in zip(sequence, run_count):
    repeated_sequence.extend([seq] * count)

# Create a new DataFrame with the repeated sequences
new_df = pd.DataFrame({"Sequence": repeated_sequence})

# Save the DataFrame to a new Excel file
new_df.to_excel("sequence_runs_split.xlsx", index=False)
