import * as Updates from "expo-updates";

function getEnvironment() {
  if (Updates.releaseChannel.startsWith("prod")) {
    // matches prod-v1, prod-v2, prod-v3
    return { envName: "PRODUCTION", apiUrl: "http://localhost:8080" }; // prod env settings
  } else if (Updates.releaseChannel.startsWith("staging")) {
    // matches staging-v1, staging-v2
    return {
      envName: "STAGING",
      apiUrl: "http://localhost:8080",
      fbAppId: 521027949012572,
    }; // stage env settings
  } else {
    // assume any other release channel is development
    return {
      envName: "DEVELOPMENT",
      apiUrl: "http://localhost:8080",
      fbAppId: 521027949012572,
    }; // dev env settings
  }
}

export default getEnvironment();
