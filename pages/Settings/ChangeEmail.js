import React, { useRef, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import axios from "../../config/@axios";
import PubSub from "pubsub-js";

import {
  Container,
  Form,
  Item,
  View,
  Label,
  Text,
  Input,
  Button,
  Toast,
} from "native-base";
import { Feather } from "@expo/vector-icons";

const ChangeEmail = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const passwordInput = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [errors, setErrors] = useState({});
  const [isDirty, setDirty] = useState(false);

  const validate = (obj) => {
    const values = {
      email,
      password,
      ...obj,
    };

    const localErrors = {
      ...errors,
    };

    if (!values.email) {
      localErrors.email = "Email is required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      localErrors.email = "Invalid email address.";
    } else {
      localErrors.email = null;
    }

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

  const handleEmailChange = (text) => {
    setEmail(text);
    validate({ email: text });
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
    setErrorMessage(null);

    if (validate()) {
      try {
        await axios.put("profile/email", {
          newEmail: email,
          password,
        });

        Toast.show({
          text: "Your e-mail has been successfully changed! Please login again.",
          buttonText: "Okay",
        });

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
      <Container>
        <View style={styles.Container}>
          <View>
            {errorMessage && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorHeading}>Error:</Text>
                <Text style={styles.errorWhite}>{errorMessage}</Text>
              </View>
            )}
            <Form style={styles.form}>
              <View>
                <Text style={styles.heading}>Change E-mail</Text>
              </View>
              <Item floatingLabel>
                <Label>New E-mail</Label>
                <Input
                  onSubmitEditing={() => {
                    passwordInput.current._root.focus();
                  }}
                  keyboardType="email-address"
                  returnKeyType={"next"}
                  onChangeText={handleEmailChange}
                  value={email}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                />
              </Item>
              {isDirty && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <View style={styles.lastItem}>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input
                    autoCapitalize="none"
                    returnKeyType={"done"}
                    onChangeText={handlePasswordChange}
                    value={password}
                    getRef={(input) => {
                      passwordInput.current = input;
                    }}
                    secureTextEntry={secureTextEntry}
                  />
                </Item>

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
              {isDirty && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <View style={styles.buttons}>
                <Button onPress={handleSubmit} bordered full rounded primary>
                  <Text>Change E-mail</Text>
                </Button>
              </View>
            </Form>
          </View>
        </View>
      </Container>
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
