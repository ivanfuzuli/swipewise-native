import * as Updates from "expo-updates";

function getEnvironment() {
  if (Updates.releaseChannel.startsWith("prod")) {
    // matches prod-v1, prod-v2, prod-v3
    return {
      envName: "PRODUCTION",
      apiUrl: "https://api.swipewiseapp.com",
      fbAppId: 580899039611484,
    }; // prod env settings
  } else if (Updates.releaseChannel.startsWith("staging")) {
    // matches staging-v1, staging-v2
    return {
      envName: "STAGING",
      apiUrl: "https://swipewise-dev.herokuapp.com",
      fbAppId: 521027949012572,
      googleAppId:
        "90841678000-8rekofcgmrll1d9r6q3fj6oc791nv3qs.apps.googleusercontent.com",
    }; // stage env settings
  } else {
    // assume any other release channel is development
    return {
      envName: "DEVELOPMENT",
      apiUrl: "https://swipewise-dev.herokuapp.com",
      fbAppId: 521027949012572,
      googleAppId:
        "90841678000-8rekofcgmrll1d9r6q3fj6oc791nv3qs.apps.googleusercontent.com",
    }; // dev env settings
  }
}

export default getEnvironment();
