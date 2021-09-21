import React, { useRef, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";

import axios from "../../config/@axios";

import { Text, Input, Button } from "react-native-elements";
import Toast from "react-native-root-toast";

const ChangeEmail = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const feedbackInput = useRef(null);

  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const [errors, setErrors] = useState({});
  const [isDirty, setDirty] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const validate = (obj) => {
    const values = {
      email,
      feedback,
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

    if (!values.feedback) {
      localErrors.feedback = "feedback is required!";
    } else {
      localErrors.feedback = null;
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

  const handleFeedbackChange = (text) => {
    setFeedback(text);
    validate({ feedback: text });
  };

  const handleSubmit = async () => {
    setDirty(true);
    setErrorMessage(null);

    if (validate()) {
      setLoading(true);
      try {
        await axios.post("feedback", {
          email: email.trim(),
          feedback,
        });

        setEmail("");
        setFeedback("");
        Toast.show("Your feedback succcessfully delivered to us. Thank you!.", {
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
                <Text style={styles.heading}>Feedback</Text>
              </View>
              <Input
                onSubmitEditing={() => {
                  feedbackInput.current.focus();
                }}
                keyboardType="email-address"
                returnKeyType={"next"}
                onChangeText={handleEmailChange}
                value={email}
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                errorMessage={isDirty && errors.email}
                placeholder="E-mail Address"
              />
              <Input
                rowSpan={5}
                multiline
                height={100}
                bordered
                placeholder="Feedback"
                autoCapitalize="none"
                returnKeyType={"done"}
                onChangeText={handleFeedbackChange}
                value={feedback}
                ref={feedbackInput}
                errorMessage={isDirty && errors.feedback}
              />
              <View style={styles.buttons}>
                <Button
                  onPress={handleSubmit}
                  disabled={isLoading}
                  loading={isLoading}
                  title="Send Feedback"
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

export default ChangeEmail;
