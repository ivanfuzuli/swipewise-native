import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";

import axios from "../../config/@axios";
import PubSub from "pubsub-js";
import Toast from "react-native-root-toast";

import { Text, Input, Button } from "react-native-elements";

const ChangeEmail = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});
  const [isDirty, setDirty] = useState(false);

  const validate = (obj) => {
    const values = {
      email,
      ...obj,
    };

    const localErrors = {
      ...errors,
    };

    if (!values.email) {
      localErrors.email = "Email is required!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())
    ) {
      localErrors.email = "Invalid email address.";
    } else {
      localErrors.email = null;
    }
    setErrors(localErrors);
    return isValid(localErrors);
  };

  const isValid = (errors) => {
    return Object.values(errors).every((item) => !!item === false);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    validate({ email: text });
  };

  const handleSubmit = async () => {
    setDirty(true);
    setErrorMessage(null);

    if (validate()) {
      try {
        await axios.put("profile/email", {
          newEmail: email.trim(),
        });

        Toast.show(
          "Your e-mail has been successfully changed! Please login again.",
          { duration: Toast.durations.LONG }
        );

        PubSub.publish("auth", "logout");
      } catch (err) {
        setErrorMessage(err.message);
      }
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
                <Text style={styles.heading}>Change E-mail</Text>
              </View>
              <Input
                placeholder="E-mail address"
                keyboardType="email-address"
                returnKeyType={"next"}
                onChangeText={handleEmailChange}
                value={email}
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                errorMessage={isDirty && errors.email}
              />
              <View style={styles.buttons}>
                <Button onPress={handleSubmit} title="Change E-mail"></Button>
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
    color: "#1582fe",
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

export default ChangeEmail;
