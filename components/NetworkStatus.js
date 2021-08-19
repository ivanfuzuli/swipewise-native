import { useEffect, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";

import { Toast } from "native-base";
import { useDispatch } from "react-redux";
import { dequeue } from "../pages/store/votesSlice";
const NetworkStatus = () => {
  const dispatch = useDispatch();

  const connectedRef = useRef(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (
        state.isConnected !== connectedRef.current &&
        state.isConnected === true
      ) {
        dispatch(dequeue());
      }

      if (!state.isConnected) {
        Toast.show({
          text: "There is a connection problem.",
          buttonText: "Okay",
        });
      }
      connectedRef.current = state.isConnected;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export default NetworkStatus;
