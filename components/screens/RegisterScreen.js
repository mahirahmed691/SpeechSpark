// LoginScreen.js
import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../../utils/firebaseConfig"; 
import { initializeApp } from "firebase/app";

import YourLogo from "../..//assets/Logo.png";
import BackgroundImage from "../../assets/BackgroundImage.png";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      // Get the Firebase auth instance
      const auth = getAuth();
      
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      // Optionally, you can do something with the user credential if needed
      console.log("User registered successfully:", userCredential.user);
  
      // Navigate to another screen after successful registration
  navigation.navigate("Login");
    } catch (error) {
      // Handle any errors that occur during registration
      console.error("Registration Error:", error.message);
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={YourLogo} style={styles.logo} resizeMode="contain" />
        <TextInput
          style={styles.input}
  label="Email"
  
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={handleRegister}
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
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor:'#FFF'
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

export default RegisterScreen;
