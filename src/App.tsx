import React, { FC, ReactElement } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteProps,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

import { Realtime } from "pages/realtime";
import { WebRtc } from "pages/web_rtc";
import { CardBoard } from "pages/card_board";
import { ErrorCheck } from "pages/error_check";

Bugsnag.start({
  apiKey: "7af284a0a4ff4c45e09e4ff63d48ee46",
  plugins: [new BugsnagPluginReact()],
});

const Error = () => <div>error</div>;
const SkywayError = () => <div>Limit of skyway free plan</div>;

interface RouteWrapProps extends RouteProps {
  fallback: ReactElement;
}

const RouteWithErrorBoundary: FC<RouteWrapProps> = ({
  children,
  fallback,
  ...routeProps
}) => {
  return (
    <Route {...routeProps}>
      <ErrorBoundary onError={(e) => Bugsnag.notify(e)} fallback={fallback}>
        {children}
      </ErrorBoundary>
    </Route>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
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

          <RouteWithErrorBoundary path="/error_check" fallback={<Error />}>
            <ErrorCheck />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary path="/realtime" fallback={<Error />}>
            <Realtime />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary path="/webrtc" fallback={<SkywayError />}>
            <WebRtc />
          </RouteWithErrorBoundary>

          <RouteWithErrorBoundary path="/board" fallback={<Error />}>
            <CardBoard />
          </RouteWithErrorBoundary>
        </div>
      </Router>
    </div>
  );
}

export default App;
