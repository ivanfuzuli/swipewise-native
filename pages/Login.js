import React, { useRef, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

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
  Spinner,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import * as Auth from "./store/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const loading = useSelector((state) => state.auth.loading);

  const passwordInput = useRef(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = () => {
    setDirty(true);

    if (validate()) {
      dispatch(
        Auth.login({
          email,
          password,
        })
      );
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
            <Text style={styles.heading}>Login</Text>
          </View>
          {errorMessage && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorHeading}>Error:</Text>
              <Text style={styles.errorWhite}>{errorMessage}</Text>
            </View>
          )}
          <View>
            <Form style={styles.form}>
              <Item floatingLabel>
                <Label>E-mail</Label>
                <Input
                  onSubmitEditing={() => {
                    passwordInput.current._root.focus();
                  }}
                  keyboardType="email-address"
                  returnKeyType={"next"}
                  onChangeText={handleEmailChange}
                  value={email}
                  autoCapitalize="none"
                />
              </Item>
              {isDirty && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <View style={styles.lastItem}>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input
                    onSubmitEditing={() => {
                      passwordInput.current._root.focus();
                    }}
                    autoCapitalize="none"
                    returnKeyType={"next"}
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
              <View style={styles.forgot}>
                <Button
                  onPress={() =>
                    Toast.show({
                      text: "Forgot password!",
                      buttonText: "Okay",
                      duration: 3000,
                    })
                  }
                  transparent
                >
                  <Text>Forgot Password?</Text>
                </Button>
              </View>
              <View style={styles.buttons}>
                <Button
                  onPress={handleSubmit}
                  bordered
                  full
                  rounded
                  primary
                  disabled={loading}
                >
                  {loading && <Spinner size={24} color="blue" />}
                  <Text>Login</Text>
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

export default Login;
