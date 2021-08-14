import env from "./config/@env";

import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import Analytics from "./config/Analytics";

import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";

import * as Font from "expo-font";
import { Root } from "native-base";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import Routes from "./Routes";
import NetworkStatus from "./components/NetworkStatus";
import AmplitudeAnalytics from "./components/AmplitudeAnalytics";

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
        </Root>
      </PersistGate>
    </Provider>
  );
}
