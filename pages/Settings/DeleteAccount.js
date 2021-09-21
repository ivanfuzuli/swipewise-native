import React, { useRef, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "../../config/@axios";
import PubSub from "pubsub-js";

import { Text, Input, Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import Analytics from "../../config/Analytics";

import Toast from "react-native-root-toast";

const DeleteAccount = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const passwordInput = useRef(null);

  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [errors, setErrors] = useState({});
  const [isDirty, setDirty] = useState(false);

  const validate = (obj) => {
    const values = {
      password,
      ...obj,
    };

    const localErrors = {
      ...errors,
    };

    if (!values.password) {
      localErrors.password = "Password is required!";
    } else {
      localErrors.password = null;
    }

    setErrors(localErrors);
    return isValid(localErrors);
  };

  const isValid = (errors) => {
    return Object.values(errors).every((item) => !!item === false);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    validate({ password: text });
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((entry) => !entry);
  };

  const handleSubmit = async () => {
    setDirty(true);
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.post("profile/delete", {
        password,
      });

      setPassword(null);
      Toast.show("Your account successfully deleted!", {
        duration: Toast.durations.LONG,
      });

      Analytics.track(Analytics.events.ACCOUNT_DELETED);
      PubSub.publish("auth", "logout");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.Container}>
          <View>
            {errorMessage && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorHeading}>Error:</Text>
                <Text style={styles.errorWhite}>{errorMessage}</Text>
              </View>
            )}
            <View style={styles.form}>
              <View>
                <Text style={styles.heading}>Delete Account</Text>
              </View>
              <View>
                <Text style={styles.attention}>
                  Attention please, your account is going to permanently
                  deleted!!
                </Text>
              </View>
              <View style={styles.lastItem}>
                <Input
                  autoCapitalize="none"
                  returnKeyType={"done"}
                  onChangeText={handlePasswordChange}
                  value={password}
                  getRef={(input) => {
                    passwordInput.current = input;
                  }}
                  secureTextEntry={secureTextEntry}
                  errorMessage={isDirty && errors.password}
                />
                <View style={styles.eye}>
                  <TouchableWithoutFeedback onPress={toggleSecureTextEntry}>
                    <View>
                      {!secureTextEntry && (
                        <Feather name="eye" size={24} color="black" />
                      )}
                      {secureTextEntry && (
                        <Feather name="eye-off" size={24} color="black" />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={styles.buttons}>
                <Button
                  onPress={handleSubmit}
                  full
                  rounded
                  danger
                  disabled={isLoading}
                  loading={isLoading}
                  title="Delete My Account"
                ></Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    borderColor: "red",
    backgroundColor: "#f9461c",
    margin: 10,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

  errorWhite: {
    padding: 5,
    color: "white",
  },

  errorHeading: {
    fontWeight: "bold",
    color: "#fff",
  },

  attention: {
    textAlign: "center",
  },
  lastItem: {
    margin: 15,
  },

  buttons: {
    margin: 10,
  },

  button: {
    margin: 10,
  },

  Container: {
    margin: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },

  heading: {
    color: "red",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  error: {
    padding: 5,
    color: "red",
  },

  eye: {
    position: "absolute",
    right: 15,
    top: 15,
  },

  forgot: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default DeleteAccount;
