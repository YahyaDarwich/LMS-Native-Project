import React, { useState } from "react";
import { Text, TextInput, StyleSheet, ToastAndroid } from "react-native";
import axios from "axios";
import { IP } from "@env";
import Button from "../components/Button";
import Background from "../components/Background";
import Header from "../components/Header";

const Login = ({ sendToken }) => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  // Toast
  const toastMessage = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const handleSubmit = () => {
    const loginINfo = {
      email: email,
      password: password,
    };

    axios
      .post(`http://192.168.0.117:8000/api/login`, loginINfo)
      .then((res) => {
        if (res.status === 200) {
          sendToken(res.data.token);
          toastMessage("You're login successfully");
        }
      })
      .catch((err) => toastMessage(err.response.data.error));
  };

  return (
    <>
      <Background>
        <Header>Welcome back 👋</Header>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Enter your email"
          autoCompleteType="email"
          label="Email"
          returnKeyType="next"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholderTextColor={"gray"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholder="Enter your password"
          label="Password"
          returnKeyType="done"
          secureTextEntry
          placeholderTextColor={"gray"}
        />
        <Button mode="contained" onPress={handleSubmit} color="#841584">
          Login
        </Button>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 2,
    padding: 10,
    color: "#fff",
    width: "100%",
    borderColor: "#00B386",
    fontSize: 18,
    borderRadius: 10,
    paddingLeft: 15,
  },
});

export default Login;
