import React, { useRef, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
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
} from "native-base";
import { Feather } from "@expo/vector-icons";
const Signup = () => {
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDirty, setDirty] = useState(false);

  const validate = (obj) => {
    const values = {
      email,
      password,
      username,
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

    if (!values.username) {
      localErrors.username = "Username is required!";
    } else if (!/^[a-zA-Z0-9]+$/i.test(values.username)) {
      localErrors.username =
        "Username should only contains alphanumeric characters..";
    } else if (values.username.length < 3) {
      localErrors.username = "Username should be least 3 characters";
    } else {
      localErrors.username = null;
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

  const handleUsernameChange = (text) => {
    setUsername(text);
    validate({ username: text });
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
      Toast.show({
        text: "Invalid password!",
        buttonText: "Okay",
        duration: 3000,
      });
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
            <Form style={styles.form}>
              <Item floatingLabel>
                <Label>E-mail</Label>
                <Input
                  onSubmitEditing={() => {
                    usernameRef.current._root.focus();
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
              <Item floatingLabel>
                <Label>Username</Label>
                <Input
                  onSubmitEditing={() => {
                    passwordRef.current._root.focus();
                  }}
                  getRef={(input) => {
                    usernameRef.current = input;
                  }}
                  keyboardType="email-address"
                  returnKeyType={"next"}
                  onChangeText={handleUsernameChange}
                  value={username}
                  autoCapitalize="none"
                />
              </Item>
              {isDirty && errors.username && (
                <Text style={styles.error}>{errors.username}</Text>
              )}
              <View style={styles.lastItem}>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input
                    onSubmitEditing={() => {
                      passwordRef.current._root.focus();
                    }}
                    autoCapitalize="none"
                    returnKeyType={"next"}
                    onChangeText={handlePasswordChange}
                    value={password}
                    getRef={(input) => {
                      passwordRef.current = input;
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
                  <Text>Sign up</Text>
                </Button>
              </View>
              <View style={styles.terms}>
                <Text style={styles.termsText}>
                  Click "Sign up" above to accept Swipewise's
                </Text>
                <TouchableOpacity onPress={() => alert("terms")}>
                  <Text style={styles.termsLink}> Terms of Service </Text>
                </TouchableOpacity>
                <Text style={styles.termsText}>and</Text>
                <TouchableOpacity onPress={() => alert("privacy")}>
                  <Text style={styles.termsLink}> Privacy Policy.</Text>
                </TouchableOpacity>
              </View>
            </Form>
          </View>
        </View>
      </Container>
    </KeyboardAvoidingView>
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
  },

  heading: {
    color: "#fe4b00",
    fontSize: 42,
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

  terms: {
    color: "#dddddd",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 15,
  },

  termsText: {
    color: "rgb(128, 128, 128)",
  },

  termsLink: {
    color: "#4991f7",
  },
});

export default Signup;
