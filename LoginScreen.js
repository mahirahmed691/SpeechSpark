import * as React from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import * as AppAuth from 'expo-app-auth';
import firebase from "firebase/app";
import "firebase/auth";

import YourLogo from "./assets/Logo.png";
import BackgroundImage from "./assets/BackgroundImage.jpeg";

const LoginScreen = ({ navigation }) => {
  const handleGoogleLogin = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId: "YOUR_ANDROID_CLIENT_ID",
        iosClientId: "497525111687-4ge8ehbbg5ohrkd0pkd20ta4q0ot69us.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(null, accessToken);
        await firebase.auth().signInWithCredential(credential);

        // Now the user is signed in with Firebase
        // Handle user information or navigate to another screen
        console.log("Firebase user data:", user);
        // navigation.navigate('Home');
      } else {
        console.log("Google sign-in failed");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={YourLogo} style={styles.logo} resizeMode="contain" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <Button mode="contained" style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </Button>
        <View style={styles.linksContainer}>
          <Text style={styles.linkText} onPress={() => navigation.navigate("Register")}>
            Don't have an account? Register here
          </Text>
          <Text style={styles.linkText} onPress={() => navigation.navigate("ForgotPassword")}>
            Forgot Password?
          </Text>
        </View>
        <Button mode="contained" style={styles.googleButton} onPress={handleGoogleLogin}>
          <View style={styles.googleButtonContent}>
            <Ionicons name="logo-google" size={15} color="#fff" />
            <Text style={styles.googleText}>Login with Google</Text>
          </View>
        </Button>
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
  googleButton: {
    width: "100%",
    height: 40,
    borderRadius: 0,
    backgroundColor: "crimson",
    marginTop: 8,
  },
  googleButtonContent: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  googleText: {
    color: "#FFF",
    fontWeight: "900",
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
