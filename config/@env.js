const release = "develop";
function getEnvironment() {
  if (release.startsWith("prod")) {
    // matches prod-v1, prod-v2, prod-v3
    return {
      envName: "PRODUCTION",
      apiUrl: "https://api.swipewiseapp.com",
      amplitudeApiKey: "43d4bd8a314dcf72434237369dcbb02b",
      limit: 50,
      waitTimeInMinutes: 30,
      fbAppId: 580899039611484,
      AppleAppID: "1581004412",
      sentryDsn:
        "https://2dfc33c7af474d26b03707b62e6151fe@o958963.ingest.sentry.io/5907450",
      googleAppId:
        "90841678000-o8cu6dmpj60390eil53119j0fvugklr4.apps.googleusercontent.com",
    }; // prod env settings
  } else if (release.startsWith("staging")) {
    // matches staging-v1, staging-v2
    return {
      envName: "STAGING",
      apiUrl: "https://swipewise-dev.herokuapp.com",
      amplitudeApiKey: "43d4bd8a314dcf72434237369dcbb02b",
      limit: 50,
      fbAppId: 521027949012572,
      AppleAppID: "1581004412",
      waitTimeInMinutes: 30,
      googleAppId:
        "90841678000-o8cu6dmpj60390eil53119j0fvugklr4.apps.googleusercontent.com",
    }; // stage env settings
  } else {
    // assume any other release channel is development
    return {
      envName: "DEVELOPMENT",
      apiUrl: "https://api.swipewiseapp.com",
      sentryDsn: "",
      amplitudeApiKey: "",
      limit: 50,
      waitTimeInMinutes: 1,
      fbAppId: 521027949012572,
      AppleAppID: "1581004412",
      googleAppId:
        "90841678000-o8cu6dmpj60390eil53119j0fvugklr4.apps.googleusercontent.com",
    }; // dev env settings
  }
}

export default getEnvironment();
