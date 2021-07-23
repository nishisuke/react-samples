import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Dnd } from "pages/dnd";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dnd">dnd</Link>
              </li>
            </ul>
          </nav>

          <Route path="/dnd">
            <Dnd />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
