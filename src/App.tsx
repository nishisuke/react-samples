import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { Dnd } from "pages/dnd";
import { Realtime } from "pages/realtime";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dnd">dnd</Link>
              </li>
              <li>
                <Link to="/realtime">realtime</Link>
              </li>
            </ul>
          </nav>

          <Route path="/dnd">
            <Dnd />
          </Route>
          <Route path="/realtime">
            <Realtime />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
