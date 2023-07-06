const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // change this to false
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('src/index.html');

  // ipcMain.on('run-python-script', (event, arg) => {
  //   let python = null;

  //   // const python = spawn('python', ['../capstone-project/nlp/scripts/model/model_markovchains_withTFIDF_electron.py', '--state', arg]); // arg is your user input
  //   if (arg.model == 'Markov Chain') {
  //     python = spawn('python', ['../capstone-project/nlp/scripts/model/electron integration/model_markovchains_withTFIDF_electron.py', '--state', arg.userInput, '--model', arg.model]); // arg is your user input and selected model
  //   } else if (arg.model == 'Markov Chain (Modified)') {
  //     python = spawn('python', ['../capstone-project/nlp/scripts/model/electron integration/model_markovchains_electron.py', '--state', arg.userInput, '--model', arg.model]); // arg is your user input and selected model
  //   } else if (arg.model == 'LSTM Classification') {
  //     python = spawn('python', ['../capstone-project/nlp/scripts/model/electron integration/model_LSTM_onehotencoder_electron.py', '--state', arg.userInput, '--model', arg.model]); // arg is your user input and selected model
  //   } else if (arg.model == 'LSTM Regression') {
  //     python = spawn('python', ['../capstone-project/nlp/scripts/model/electron integration/model_LSTM_electron.py', '--state', arg.userInput, '--model', arg.model]); // arg is your user input and selected model
  //   }

  //   python.stdout.on('data', (data) => {
  //     win.webContents.send('python-script-result', data.toString());
  //   });

  //   python.stderr.on('data', (data) => {
  //     console.error(`stderr: ${data}`);
  //   });

  //   python.on('close', (code) => {
  //     console.log(`child process exited with code ${code}`);
  //   });
  // });

  ipcMain.on('run-python-script', (event, arg) => {
    let python = null; // Initialize with a default value

    if (arg.model == 'model1') {
      python = spawn('python', ['../capstone-project/nlp/scripts/model/electron integration/model_markovchains_electron.py', '--state', arg.userInput]);
    } else if (arg.model == 'model2') {
      python = spawn('python', ['../capstone-project/nlp/scripts/model/electron integration/model_markovchains_withTFIDF_electron.py', '--state', arg.userInput]);
    } else if (arg.model == 'model3') {
      python = spawn('python', ['../capstone-project/nlp/scripts/model/electron integration/model_LSTM_onehotencoder_electron.py', '--state', arg.userInput]);
    } else if (arg.model == 'model4') {
      python = spawn('python', ['../capstone-project/nlp/scripts/model/electron integration/model_LSTM_electron.py', '--state', arg.userInput]);
    }

    if (python !== null) {
      let output = ''; // Initialize an empty string to hold the output

      python.stdout.on('data', (data) => {
        output += data.toString(); // Append the new data to the existing output
        win.webContents.send('python-script-result', output); // Send the updated output to the renderer process
      });

      python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    } else {
      console.error('Invalid model specified.'); // Handle the case where none of the conditions match
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
