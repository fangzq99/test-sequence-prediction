// Import the required modules
const React = require("react");
const ReactDOM = require("react-dom");

// Import the main App component
const App = require("./pages/app.js");

console.log("Renderer process running.");

// // Render the App component in the root element of the HTML page
ReactDOM.render(<App />, document.getElementById("root"));
