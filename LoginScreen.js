import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import YourLogo from "./assets/Logo.png";
import BackgroundImage from "./assets/BackgroundImage.jpeg";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const simulateLogin = async (email, password) => {
    try {
      console.log("Simulating login with:", email, password);
  
      // Simulate a delay to mimic the asynchronous nature of authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Simulate successful login
      const simulatedUser = {
        uid: "simulatedUserId", // Replace with a unique identifier
        email: email,
      };
      navigation.navigate("Home");
  
      console.log("Simulated user logged in:", simulatedUser.uid);
  
      // Simulate returning user data
      return simulatedUser;
    } catch (error) {
      // Simulate login error
      console.error("Simulated Login Error:", error.message);
      throw error;
    }
  };
  
  // Example usage
  const handleLogin = async () => {
    try {
      const simulatedUser = await simulateLogin(email, password);
      // You can use the simulated user data as needed
      console.log("Simulated user data:", simulatedUser);
      // Navigate to another screen after successful login
      // navigation.navigate("Home");
    } catch (error) {
      // Handle login error
      console.error("Simulated Login Error:", error.message);
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
          <Text style={styles.buttonText}>Login</Text>
        </Button>
        <View style={styles.linksContainer}>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("Register")}
          >
            Don't have an account? Register here
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