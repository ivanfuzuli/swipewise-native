import env from "./config/@env";

import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";

import Analytics from "./config/Analytics";
import * as Sentry from "sentry-expo";

import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";

import * as Font from "expo-font";
import { Root } from "native-base";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import Routes from "./Routes";
import NetworkStatus from "./components/NetworkStatus";
import AmplitudeAnalytics from "./components/AmplitudeAnalytics";
import InstagramShell from "./pages/Instagram/InstagramShell";

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  async function loadResourcesAndDataAsync() {
    if (isLoadingComplete) return;
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      });
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    }
  }

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

  const loadingComplete = () => setLoadingComplete(true);

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAndDataAsync}
        onFinish={loadingComplete}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root>
          <StatusBar barStyle="dark-content" />
          <NetworkStatus />
          <AmplitudeAnalytics />
          <Routes />
          <InstagramShell />
        </Root>
      </PersistGate>
    </Provider>
  );
}
