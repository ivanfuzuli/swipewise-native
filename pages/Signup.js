import React, { useRef, useState } from "react";
import * as Auth from "./store/authSlice";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from "react-native";

import {
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
import * as RootNavigation from "../RootNavigation.js";

import { useSelector, useDispatch } from "react-redux";

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const loading = useSelector((state) => state.auth.loading);

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
    } else if (values.password.length < 4) {
      localErrors.username = "Password should be least 4 characters";
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

  const handleSubmit = async () => {
    setDirty(true);

    if (validate()) {
      try {
        await dispatch(
          Auth.signup({
            email,
            username,
            password,
          })
        ).unwrap();

        RootNavigation.navigate("Select Books");
      } catch (err) {}
    }
  };

  return (
    <View>
      <Form style={styles.form}>
        <View>
          <Text style={styles.heading}>Sign Up</Text>
        </View>
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorHeading}>Error:</Text>
            <Text style={styles.errorWhite}>{errorMessage}</Text>
          </View>
        )}
        <View style={styles.item}>
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
              autoCompleteType="email"
              autoCorrect={false}
              textContentType="emailAddress"
            />
          </Item>
        </View>
        {isDirty && errors.email && (
          <Text style={styles.error}>{errors.email}</Text>
        )}
        <View style={styles.item}>
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
        </View>
        {isDirty && errors.username && (
          <Text style={styles.error}>{errors.username}</Text>
        )}
        <View style={styles.item}>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              onSubmitEditing={() => {
                passwordRef.current._root.focus();
              }}
              autoCapitalize="none"
              returnKeyType={"done"}
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
          <Button
            onPress={handleSubmit}
            bordered
            full
            rounded
            primary
            disabled={loading}
          >
            {loading && <Spinner size={24} color="blue" />}
            <Text>Sign up Free</Text>
          </Button>
        </View>
        <View style={styles.terms}>
          <Text style={styles.termsText}>
            Click "Sign up" above to accept Swipewise's
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://swipewiseapp.com/terms.html")
            }
          >
            <Text style={styles.termsLink}> Terms of Service </Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>and</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://swipewiseapp.com/privacy.html")
            }
          >
            <Text style={styles.termsLink}> Privacy Policy.</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
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
  item: {
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },

  buttons: {
    margin: 10,
  },

  button: {
    margin: 10,
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
