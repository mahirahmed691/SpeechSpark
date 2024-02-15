import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon

const WordGuessGame = ({ closeModal, logo, instructions }) => {
  const words = ["apple", "banana", "orange", "grape", "pineapple"];
  const randomIndex = Math.floor(Math.random() * words.length);
  const wordToGuess = words[randomIndex];

  const [userGuess, setUserGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hint, setHint] = useState("");

  const handleGuess = () => {
    if (!userGuess.trim()) {
      setFeedback("Please enter a word.");
      return;
    }

    const firstLetter = wordToGuess.charAt(0).toUpperCase();
    const lastLetter = wordToGuess.charAt(wordToGuess.length - 1).toUpperCase();
    const numLetters = wordToGuess.length;
    setHint(
      `Hints: First letter is ${firstLetter}, last letter is ${lastLetter}, and the word has ${numLetters} letters.`
    );

    setAttempts(attempts + 1);
    if (userGuess.toLowerCase() === wordToGuess) {
      setFeedback(
        `Congratulations! You guessed the word '${wordToGuess}' in ${
          attempts + 1
        } attempts.`
      );
      setUserGuess("");
    } else {
      setFeedback("Incorrect guess. Try again!");
    }
  };

  const resetGame = () => {
    const newIndex = Math.floor(Math.random() * words.length);
    const newWordToGuess = words[newIndex];
    setUserGuess("");
    setFeedback("");
    setAttempts(0);
    setHint("");
  };

  return (
    <View style={styles.container}>
      <Icon
        name="times"
        size={24}
        color="#fff"
        style={styles.closeIcon}
        onPress={closeModal}
      />
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instruction}>{instructions}</Text>
      {hint !== "" && <Text style={styles.hint}>{hint}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your guess"
          placeholderTextColor="black"
          value={userGuess}
          onChangeText={setUserGuess}
        />
        <Button mode="contained" style={styles.button} onPress={handleGuess}>
          Guess
        </Button>
        <Button mode="contained" style={styles.button} onPress={resetGame}>
          New Word
        </Button>
        <Text style={styles.feedback}>{feedback}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  instruction: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  hint: {
    marginBottom: 10,
    fontStyle: "italic",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  button: {
    width: "80%",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "black",
  },
  feedback: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default WordGuessGame;