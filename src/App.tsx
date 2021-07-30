import React, { FC, ReactElement } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteProps,
} from "react-router-dom";
import { Realtime } from "pages/realtime";
import { WebRtc } from "pages/web_rtc";
import { CardBoard } from "pages/card_board";
import { ErrorBoundary } from "react-error-boundary";

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
      <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
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
