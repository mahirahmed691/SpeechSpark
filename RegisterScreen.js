// LoginScreen.js
import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import YourLogo from "./assets/Logo.png";
import BackgroundImage from "./assets/BackgroundImage.jpeg";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Replace the following line with your actual authentication mechanism
      // In this example, we assume any email and password are valid
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      console.log("User logged in successfully");
      // Optionally, navigate to another screen after successful login
       navigation.navigate("Home");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={YourLogo} style={styles.logo} resizeMode="contain" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Button>
        <View style={styles.linksContainer}>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Login")}
          >
            Already have an account? Login.
          </Text>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot Password?
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingBottom: 150,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  loginButton: {
    width: "100%",
    borderRadius: 0,
    backgroundColor: "#38B5FD",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "800",
  },
  linksContainer: {
    marginTop: 12,
    alignSelf: "center",
  },
  linkText: {
    color: "#FFF",
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default LoginScreen;
