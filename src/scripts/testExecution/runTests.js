document.addEventListener('DOMContentLoaded', (event) => {
  const informationList = document.getElementById('informationList');
  const userInput = document.getElementById('user-input');
  const processButton = document.getElementById('process-button');

  // Assuming 'data' is an array containing your information
  const data = ['a1022', 'a1033', 'a1044', 'a1055'];

  for (let item of data) {
    let listItem = document.createElement('li');
    listItem.textContent = item;

    // Create a new button element
    let runButton = document.createElement('button');
    runButton.textContent = 'Run';
    runButton.style.marginRight = '20px';
    runButton.style.float = 'right'; // To align the button on the right

    runButton.addEventListener('click', () => {
      const selectedModel = document.getElementById('model-select').value;
      if (!selectedModel) {
        alert('Please select a model first.');
        return;
      }
      userInput.value = item;
      console.log(item);
      console.log(selectedModel);
      ipcRenderer.send('run-python-script', { userInput: item, model: selectedModel });
    });

    // Append the runButton to the listItem
    listItem.appendChild(runButton);

    informationList.appendChild(listItem);
  }

  // Add click event listener to the processButton
  processButton.addEventListener('click', () => {
    const userInputValue = userInput.value;
    const selectedModel = document.getElementById('model-select').value;
    if (!userInputValue) {
      alert('Please enter user input.');
      return;
    }
    if (!selectedModel) {
      alert('Please select a model first.');
      return;
    }
    ipcRenderer.send('run-python-script', { userInput: userInputValue, model: selectedModel });
  });
});

// Store the previous output messages
let outputHistory = '';

// Function to append new output messages
function appendOutput(message) {
  outputHistory += message + '<br>'; // Add the new message to the history
  $('#output').html(outputHistory); // Update the output area using jQuery
}

// Initialize resizable feature
$('#output-area').resizable();

// Usage example
appendOutput('First output message');
appendOutput('Second output message');
