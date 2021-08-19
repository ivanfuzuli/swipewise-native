import React, { useRef, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "../../config/@axios";

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
const ChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const passwordInput = useRef(null);

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [oldPasswordSecureTextEntry, setOldPasswordSecureTextEntry] =
    useState(true);

  const [errors, setErrors] = useState({});
  const [isDirty, setDirty] = useState(false);

  const validate = (obj) => {
    const values = {
      password,
      oldPassword,
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

  const handleOldPasswordChange = (text) => {
    setOldPassword(text);
    validate({ email: text });
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    validate({ password: text });
  };

  const toggleOldPasswordSecureTextEntry = () => {
    setOldPasswordSecureTextEntry((entry) => !entry);
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((entry) => !entry);
  };

  const handleSubmit = async () => {
    setDirty(true);
    setLoading(true);
    setErrorMessage(null);
    try {
      await axios.put("profile/password", {
        oldPassword: oldPassword,
        newPassword: password,
      });
      setPassword(null);
      setOldPassword(null);
      Toast.show({
        text: "Your password has been successfully changed!",
        buttonText: "Okay",
      });
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
                <Text style={styles.heading}>Change Password</Text>
              </View>
              <View style={styles.lastItem}>
                <Item floatingLabel>
                  <Label>Old Password</Label>
                  <Input
                    onSubmitEditing={() => {
                      passwordInput.current._root.focus();
                    }}
                    autoCapitalize="none"
                    returnKeyType={"next"}
                    onChangeText={handleOldPasswordChange}
                    value={oldPassword}
                    secureTextEntry={oldPasswordSecureTextEntry}
                  />
                </Item>

                <View style={styles.eye}>
                  <TouchableWithoutFeedback
                    onPress={toggleOldPasswordSecureTextEntry}
                  >
                    <View>
                      {!oldPasswordSecureTextEntry && (
                        <Feather name="eye" size={24} color="black" />
                      )}
                      {oldPasswordSecureTextEntry && (
                        <Feather name="eye-off" size={24} color="black" />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              {isDirty && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <View style={styles.lastItem}>
                <Item floatingLabel>
                  <Label>New Password</Label>
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
                <Button
                  onPress={handleSubmit}
                  bordered
                  full
                  rounded
                  primary
                  disabled={isLoading}
                >
                  {isLoading && <Spinner size={24} color="blue" />}
                  <Text>Change Password</Text>
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

export default ChangePassword;
