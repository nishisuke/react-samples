import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { Dnd } from "pages/dnd";
import { Realtime } from "pages/realtime";
import { WebRtc } from "pages/web_rtc";
import { CardBoard } from "pages/card_board";

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
              <li>
                <Link to="/webrtc">webrtc</Link>
              </li>
              <li>
                <Link to="/board">dnd card board</Link>
              </li>
            </ul>
          </nav>

          <Route path="/dnd">
            <Dnd />
          </Route>
          <Route path="/realtime">
            <Realtime />
          </Route>
          <Route path="/webrtc">
            <WebRtc />
          </Route>
          <Route path="/board">
            <CardBoard />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
