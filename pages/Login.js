import React, { useState } from "react";
import { Text, TextInput, SafeAreaView, StyleSheet } from "react-native";
import axios from "axios";
import { IP } from "@env";
import Button from "../components/Button";
import Background from "../components/Background";
import Header from "../components/Header";

const Login = ({ sendToken }) => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const handleSubmit = () => {
    const loginINfo = {
      email: email,
      password: password,
    };

    axios
      .post(`http://${IP}/api/login`, loginINfo)
      .then((res) => {
        if (res.status === 200) {
          sendToken(res.data.token);
        }
      })
      .catch((err) => console.log(`Error ${err}`));
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
    marginTop: 30,
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
