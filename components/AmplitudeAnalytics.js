import { useEffect } from "react";
import Analytics from "../config/Analytics";

import { useSelector } from "react-redux";
const AmplitudeAnalytics = () => {
  const userId = useSelector((state) => state.auth.user.sub);
  useEffect(() => {
    Analytics.identify(userId);
  }, [userId]);

  return null;
};

export default AmplitudeAnalytics;
