import * as Amplitude from "expo-analytics-amplitude";
import Environment from "./@env";

let isInitialized = false;
const apiKey = Environment.amplitudeApiKey;

export const events = {
  INIT: "INIT",
  LANDING_PAGE_OPENED: "LANDING_PAGE_OPENED",
  EMPTY_PAGE_OPENED: "EMPTY_PAGE_OPENED",
  QUOTES_PAGE_OPENED: "QUOTES_PAGE_OPENED",
  LOGIN_PAGE_OPENED: "LOGIN_PAGE_OPENED",
  SELECT_TAGS_OPENED: "SELECT_TAGS_OPENED",
  SIGN_IN: "SIGN_IN",
  SING_UP: "SIGN_UP",
  LOGOUT: "LOGOUT",
  TIME_UP: "TIME_UP",
  ACCOUNT_DELETED: "ACCOUNT_DELETED",
};

const canUseAmplitude = apiKey;

export async function initialize() {
  if (isInitialized || !canUseAmplitude) {
    return;
  }

  await Amplitude.initializeAsync(apiKey);
  isInitialized = true;
}

export async function identify(id) {
  initialize();

  if (!canUseAmplitude) return;
  if (id) {
    await Amplitude.setUserIdAsync(id);
  } else {
    await Amplitude.clearUserPropertiesAsync();
  }
}

export async function track(event) {
  initialize();

  if (!canUseAmplitude) return;
  await Amplitude.logEventAsync(event);
}

export default {
  events,
  initialize,
  identify,
  track,
};
