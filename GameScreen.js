import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
} from "react-native";
import { Button } from "react-native-paper";
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
    return Math.floor(Math.random() * 100) + 1;
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

  const handleMathQuizGame = () => {
    const userAnswer = parseInt(mathAnswer);

    if (isNaN(userAnswer)) {
      Alert.alert("Invalid Answer", "Please enter a valid number.", [
        { text: "OK" },
      ]);
      return;
    }

    setAttempts(attempts + 1);

    if (userAnswer === eval(mathProblem)) {
      Alert.alert(
        "Congratulations!",
        `You solved the math problem '${mathProblem}' in ${attempts} attempts.`,
        [{ text: "OK" }]
      );
      setMathProblem(generateRandomMathProblem());
      setMathAnswer("");
      setAttempts(0);
    } else {
      Alert.alert("Incorrect Answer", "Try again.", [{ text: "OK" }]);
      setMathAnswer("");
    }
  };

  const generateRandomMathProblem = () => {
    const operators = ["+", "-", "*"];
    const getRandomOperator = () =>
      operators[Math.floor(Math.random() * operators.length)];

    const operand1 = Math.floor(Math.random() * 10) + 1;
    const operand2 = Math.floor(Math.random() * 10) + 1;

    const operator = getRandomOperator();

    const newMathProblem = `${operand1} ${operator} ${operand2}`;
    setMathProblem(newMathProblem);
    setMathAnswer(eval(newMathProblem).toString());

    return newMathProblem;
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
                    <Button style={{position:'absolute', bottom:-220, left:0, right:0, backgroundColor:'#72B7EE', color:'white'}} mode="contained" onPress={handleGuessNumberGame}>
                      Make Guess
                    </Button>
                  </View>
                )}
                {selectedGame.navigateTo === "WordGuessGame" && (
                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your guess"
                      onChangeText={(text) => setWordGuess(text)}
                    />
                    <Button style={{position:'absolute', bottom:-220, left:0, right:0, backgroundColor:'#72B7EE', color:'white'}} mode="contained" onPress={handleWordGuessGame}>
                      Make Guess
                    </Button>
                  </View>
                )}
                {selectedGame.navigateTo === "MathQuizGame" && (
                  <View>
                    <Text style={styles.mathProblem}>{mathProblem}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your answer"
                      keyboardType="numeric"
                      onChangeText={(text) => setMathAnswer(text)}
                    />
                    <Button style={{position:'absolute', bottom:-170, left:0, right:0, backgroundColor:'#72B7EE', color:'white'}} mode="outlined" onPress={handleMathQuizGame}>
                      Submit Answer
                    </Button>
                  </View>
                )}
                <Button style={{marginTop:20, position:'absolute', bottom:20, left:20, right:20,}} mode="outlined" onPress={closeModal}>
                  Close
                </Button>
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
    backgroundColor: "#EDE7F6", // Lavender background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4527A0", // Dark purple text color
  },
  gameItem: {
    padding: 16,
    backgroundColor: "#72B7EE", // Peach background
    borderRadius: 8,
    marginVertical: 8,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF", // Dark purple text color
  },
  gameDescription: {
    marginTop: 8,
    color: "#FFF", // Dark gray text color
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "95%",
    height: 600,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4527A0", // Dark purple text color
  },
  input: {
    borderBottomWidth: 2,
    marginBottom: 10,
    padding: 8,
    borderColor: "#4527A0",
    marginTop:200 // Dark purple border color
  },
  mathProblem: {
    fontSize: 40,
    marginBottom: 16,
    color: "#FFF",
    backgroundColor: "#f0f0f0", 
    padding: 10,
    borderRadius: 8,
  },
});

export default GamesScreen;
