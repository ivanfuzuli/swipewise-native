import React, { useRef } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

import {
  Container,
  Form,
  Item,
  View,
  Label,
  Text,
  Input,
  Button,
} from "native-base";

const Landing = ({ navigation }) => {
  const passwordInput = useRef(null);

  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log("errrors", errors);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Container>
        <View style={styles.Container}>
          <Text style={styles.heading}>Login</Text>
          <View>
            <Form>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Item floatingLabel>
                    <Label>E-mail</Label>
                    <Input
                      onSubmitEditing={() => {
                        passwordInput.current._root.focus();
                      }}
                      keyboardType="email-address"
                      returnKeyType={"next"}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  </Item>
                )}
                name="email"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.email && <Text>This is required.</Text>}
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                      errorText="<hello"
                      onSubmitEditing={() => {
                        passwordInput.current._root.focus();
                      }}
                      returnKeyType={"next"}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      getRef={(input) => {
                        passwordInput.current = input;
                      }}
                    />
                  </Item>
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.password && <Text>This is required.</Text>}

              <View style={styles.buttons}>
                <Button
                  onPress={handleSubmit(onSubmit)}
                  style={styles.button}
                  bordered
                  full
                  rounded
                  primary
                >
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
  buttons: {
    margin: 10,
  },
  button: {
    margin: 10,
  },
  Container: {
    marginTop: 150,
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
});

export default Landing;
