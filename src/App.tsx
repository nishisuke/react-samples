import React, { FC, ReactElement, VFC } from "react";
import { BrowserRouter as Router, Route, RouteProps } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Bugsnag from "@bugsnag/js";

import { AppBar } from "components/app_bar";
import { Tabs } from "components/tabs";
import { Error } from "components/error";
import { Realtime } from "pages/realtime";
import { WebRtc } from "pages/web_rtc";
import { CardBoard } from "pages/card_board";
import { ErrorCheck } from "pages/error_check";

const App: VFC = () => {
  return (
    <Router>
      <AppBar />
      <Tabs />

      <RouteWithErrorBoundary path="/error_check" fallback={<Error />}>
        <ErrorCheck />
      </RouteWithErrorBoundary>

      <RouteWithErrorBoundary path="/messages" fallback={<Error />}>
        <Realtime />
      </RouteWithErrorBoundary>

      <RouteWithErrorBoundary
        path="/webrtc"
        fallback={<div>Limit of skyway free plan</div>}
      >
        <WebRtc />
      </RouteWithErrorBoundary>

      <RouteWithErrorBoundary path="/cardboard" fallback={<Error />}>
        <CardBoard />
      </RouteWithErrorBoundary>
    </Router>
  );
};

interface RouteWrapProps extends RouteProps {
  fallback: ReactElement;
}

const RouteWithErrorBoundary: FC<RouteWrapProps> = ({
  children,
  fallback,
  ...routeProps
}) => (
  <Route {...routeProps}>
    <ErrorBoundary onError={(e) => Bugsnag.notify(e)} fallback={fallback}>
      {children}
    </ErrorBoundary>
  </Route>
);

export default App;
