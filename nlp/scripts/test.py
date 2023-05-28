from nltk.tokenize import sent_tokenize, word_tokenize
import json
import os

# Get the absolute path of the script
script_path = os.path.abspath(__file__)

# Get the directory containing the script
script_dir = os.path.dirname(script_path)

# Construct the absolute file path
file_path = os.path.join(script_dir, "Successful Delete.cy.js")
# print(os.getcwd())

with open(file_path, "r") as j:
    example_string = j.read()

# test = word_tokenize(example_string)
test = sent_tokenize(example_string)
# print(test)

#######

# from pyjsparser import parse

# ohh = parse(test)

# print(ohh)

# file_path = "output.json"
# with open(file_path, "w") as file:
#     # Write JSON response to the file
#     file.write(ohh)

from slimit import minify

text = """
var foo = function( obj ) {
        for ( var name in obj ) {
            return false;
        }
    return true;
};
"""
print(minify(text, mangle=True, mangle_toplevel=True))