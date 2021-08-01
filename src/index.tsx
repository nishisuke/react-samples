import React from "react";
import ReactDOM from "react-dom";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

Bugsnag.start({
  apiKey: "7af284a0a4ff4c45e09e4ff63d48ee46",
  plugins: [new BugsnagPluginReact()],
  enabledReleaseStages: ["production"],
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
