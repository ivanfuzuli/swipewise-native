import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Linking,
  SafeAreaView,
  ScrollView,
} from "react-native";

import Analytics from "../config/Analytics";
import {
  Container,
  Form,
  Item,
  View,
  Label,
  Text,
  Input,
  Button,
  Spinner,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import env from "../config/@env";

import * as Auth from "./store/authSlice";
import { useSelector, useDispatch } from "react-redux";

import ErrorMessage from "../components/ErrorMessage";
import Divider from "./Social/Divider";
import FacebookAuth from "./Social/FacebookAuth";
import GoogleAuth from "./Social/GoogleAuth";

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

  const handleSubmit = async () => {
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

  const handleForgot = () => {
    Linking.openURL(env.apiUrl + "/forgot");
  };

  useEffect(() => {
    Analytics.track(Analytics.events.LOGIN_PAGE_OPENED);
  }, []);
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.Container}>
              <View>
                <Text style={styles.heading}>Login</Text>
              </View>
              <ErrorMessage message={errorMessage} />
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
                        onSubmitEditing={() => {
                          passwordInput.current._root.focus();
                        }}
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
                  <View style={styles.forgot}>
                    <Button onPress={handleForgot} transparent>
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
                <Divider />
                <FacebookAuth title="Sign In with Facebook" />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
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
