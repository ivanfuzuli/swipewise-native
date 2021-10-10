import env from "./config/@environment";

import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";

import Analytics from "./config/Analytics";
import * as Sentry from "sentry-expo";

import { StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import Routes from "./Routes";
import NetworkStatus from "./components/NetworkStatus";
import AmplitudeAnalytics from "./components/AmplitudeAnalytics";
import InstagramShell from "./pages/Instagram/InstagramShell";

export default function App() {
  useEffect(() => {
    (async () => {
      if (env.sentryDsn) {
        Sentry.init({
          dsn: env.sentryDsn,
          enableInExpoDevelopment: false,
          debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
        });
      }

      await Analytics.initialize();
      await Analytics.track(Analytics.events.INIT);
    })();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <StatusBar barStyle="dark-content" />
          <NetworkStatus />
          <AmplitudeAnalytics />
          <Routes />
          <InstagramShell />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
