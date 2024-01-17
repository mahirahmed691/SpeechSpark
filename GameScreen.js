import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GamesScreen = () => {
 const gamesList = [
    {
      id: "1",
      title: "Guess the Number",
      description: "Try to guess the randomly generated number between 1 and 100.",
      navigateTo: "GuessNumberGame",
    },
    {
      id: "2",
      title: "Word Guessing Game",
      description: "Try to guess the randomly generated word.",
      navigateTo: "WordGuessGame",
    },
    {
      id: "3",
      title: "Math Quiz",
      description: "Solve simple math problems.",
      navigateTo: "MathQuizGame",
    },
    {
      id: "4",
      title: "Color Matching",
      description: "Match colors in a fun game.",
      navigateTo: "ColorMatchingGame",
    },
  ];

  const [attempts, setAttempts] = useState(0);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [guessNumber, setGuessNumber] = useState(null);
  const [wordToGuess, setWordToGuess] = useState(null);
  const [wordGuess, setWordGuess] = useState("");
  const [mathProblem, setMathProblem] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const handleGameSelection = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
    initializeGame(game);
    fadeIn();
  };

  const closeModal = () => {
    fadeOut(() => {
      setSelectedGame(null);
      setModalVisible(false);
    });
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (onComplete) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => onComplete && onComplete());
  };

  const initializeGame = (game) => {
    if (game.navigateTo === "GuessNumberGame") {
      setGuessNumber(generateRandomNumber());
    } else if (game.navigateTo === "WordGuessGame") {
      setWordToGuess(generateRandomWord());
    }
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1; // Generates a random number between 1 and 100
  };

  const generateRandomWord = () => {
    const words = ["apple", "banana", "orange", "grape", "kiwi"];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const handleGuessNumberGame = () => {
    const userGuess = parseInt(wordGuess);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      Alert.alert("Invalid Guess", "Please enter a number between 1 and 100.", [
        { text: "OK" },
      ]);
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === guessNumber) {
      Alert.alert(
        "Congratulations!",
        `You guessed the number ${guessNumber} in ${attempts} attempts.`,
        [{ text: "OK" }]
      );
      setGuessNumber(generateRandomNumber());
      setAttempts(0);
      setWordGuess("");
    } else {
      const message =
        userGuess < guessNumber
          ? "Too low! Try again."
          : "Too high! Try again.";
      Alert.alert("Incorrect Guess", message, [{ text: "OK" }]);
      setWordGuess("");
    }
  };

  const handleWordGuessGame = () => {
    if (wordGuess.toLowerCase() === wordToGuess) {
      Alert.alert(
        "Congratulations!",
        `You guessed the word '${wordToGuess}' correctly.`,
        [{ text: "OK" }]
      );
      setWordToGuess(generateRandomWord());
      setWordGuess("");
    } else {
      Alert.alert("Incorrect Guess", "Try again.", [{ text: "OK" }]);
      setWordGuess("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Games for Autism</Text>
      <FlatList
        data={gamesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleGameSelection(item)}
            style={styles.gameItem}
          >
            <Text style={styles.gameTitle}>{item.title}</Text>
            <Text style={styles.gameDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal for displaying the selected game */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.modalContent}>
            {selectedGame && (
              <>
                <Text style={styles.modalTitle}>{selectedGame.title}</Text>
                {selectedGame.navigateTo === "GuessNumberGame" && (
                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your guess"
                      keyboardType="numeric"
                      onChangeText={(text) => setWordGuess(text)}
                    />
                    <Button
                      title="Make Guess"
                      onPress={handleGuessNumberGame}
                    />
                  </View>
                )}
                {selectedGame.navigateTo === "WordGuessGame" && (
                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your guess"
                      onChangeText={(text) => setWordGuess(text)}
                    />
                    <Button title="Make Guess" onPress={handleWordGuessGame} />
                  </View>
                )}
                <Button title="Close" onPress={closeModal} />
              </>
            )}
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FCE4EC", // Light pink background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4A148C", // Deep purple text color
  },
  gameItem: {
    borderBottomWidth: 1,
    padding: 16,
    backgroundColor: "pink", // Amber background
    borderRadius: 8,
    marginVertical: 8,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A148C", // Deep purple text color
  },
  gameDescription: {
    marginTop: 8,
    color: "#333", // Dark gray text color
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent dark background
  },
  modalContent: {
    backgroundColor: "pink", // White background
    padding: 20,
    borderRadius: 10,
    width: "90%",
    height:500
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4A148C", // Deep purple text color
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderColor: "#4A148C", // Deep purple border color
  },
});

export default GamesScreen;
