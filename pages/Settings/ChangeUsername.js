import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";

import axios from "../../config/@axios";
import Toast from "react-native-root-toast";

import { Text, Input, Button } from "react-native-elements";

const ChangeUsername = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setusername] = useState("");

  const [errors, setErrors] = useState({});
  const [isDirty, setDirty] = useState(false);

  const validate = (obj) => {
    const values = {
      username,
      ...obj,
    };

    const localErrors = {
      ...errors,
    };

    if (!values.username) {
      localErrors.username = "Username is required!";
    } else if (!/^[a-zA-Z0-9]+$/i.test(values.username.trim())) {
      localErrors.username =
        "Username should only contains alphanumeric characters..";
    } else if (values.username.length < 3) {
      localErrors.username = "Username should be least 3 characters";
    } else {
      localErrors.username = null;
    }
    setErrors(localErrors);
    return isValid(localErrors);
  };

  const isValid = (errors) => {
    return Object.values(errors).every((item) => !!item === false);
  };

  const handleUsernameChange = (text) => {
    setusername(text);
    validate({ username: text });
  };

  const handleSubmit = async () => {
    setDirty(true);
    setErrorMessage(null);

    if (validate()) {
      try {
        setLoading(true);
        await axios.put("profile/username", {
          username: username.trim(),
        });

        Toast.show("Your username has been successfully changed!", {
          duration: Toast.durations.LONG,
        });
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
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
                <Text style={styles.heading}>Change Username</Text>
              </View>
              <Input
                placeholder="Username"
                returnKeyType={"next"}
                onChangeText={handleUsernameChange}
                value={username}
                autoCapitalize="none"
                autoCompleteType="username"
                autoCorrect={false}
                errorMessage={isDirty && errors.username}
              />
              <View style={styles.buttons}>
                <Button
                  onPress={handleSubmit}
                  loading={isLoading}
                  title="Change Username"
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

export default ChangeUsername;
