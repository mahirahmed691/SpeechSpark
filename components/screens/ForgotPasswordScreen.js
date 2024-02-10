import React, { useState } from "react";
import { View, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import YourLogo from "../../assets/Logo.png"; // Replace with the actual path to your logo
import BackgroundImage from "../../assets/BackgroundImage.png";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isResetSent, setIsResetSent] = useState(false);

  const handleResetPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setIsResetSent(true);
    } catch (error) {
      console.error("Password Reset Error:", error.message);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login'); // Navigate back to the Login screen
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={YourLogo} style={styles.logo} resizeMode="contain" />
        {!isResetSent ? (
          <>
            <TextInput
              style={styles.input}
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Button
              mode="contained"
              style={styles.resetButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </Button>
          </>
        ) : (
          <>
            <Text style={styles.resetText}>
               Password reset instructions sent to your email. Please check your inbox.
            </Text>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={styles.backToLogin}>Back to Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "stretch",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor:'#FFF'
  },
  resetButton: {
    width: "100%",
    borderRadius: 0,
    backgroundColor: "#38B5FD",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "800",
  },
  resetText: {
    textAlign: "center",
    marginTop: 16,
    color: "#FFF",
  },
  backToLogin: {
    textAlign: "center",
    marginTop: 16,
    color: "#FFF",
    textDecorationLine: "underline",
  },
});

export default ForgotPasswordScreen;
