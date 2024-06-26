import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PubSub from "pubsub-js";
import * as SecureStore from "expo-secure-store";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  blacklist: ["status", "claps"],
  storage: AsyncStorage,
};

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];
if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

PubSub.subscribe("auth", async (_, data) => {
  if (data === "logout") {
    await SecureStore.deleteItemAsync("token");
    store.dispatch({ type: "LOGOUT" });
  }
});

export const persistor = persistStore(store);
