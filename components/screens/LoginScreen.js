import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Image, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 

import YourLogo from "../../assets/Logo-No-BG.png";
import BackgroundImage from "../../assets/BackgroundImage.png";
import firebase from "../../utils/firebaseConfig"; // Import the firebase module

const LoginScreen = ({ navigation, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginWithEmail = async () => {
    try {
      const auth = getAuth(); 
      const userCredential = await signInWithEmailAndPassword(auth, email, password); 
      // Signed in
      const user = userCredential.user;
      console.log("Firebase authentication successful. User:", user);
      onLogin(); 
    } catch (error) {
      console.log("Firebase authentication error:", error.message);
      Alert.alert("Error", error.message); 
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
        <Button mode="contained" style={styles.loginButton} onPress={handleLoginWithEmail}>
          Login with Email
        </Button>
        <View style={styles.linksContainer}>
          <Text style={styles.linkText} onPress={() => navigation.navigate("Register")}>
            Don't have an account? Register here
          </Text>
          <Text style={styles.linkText} onPress={() => navigation.navigate("ForgotPassword")}>
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
    backgroundColor:'#A9CFCF'
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  loginButton: {
    width: "100%",
    borderRadius: 0,
    backgroundColor: "#38B5FD",
    marginTop: 8,
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
    textAlign:'center'
  },
});

export default LoginScreen;
