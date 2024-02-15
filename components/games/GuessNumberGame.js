import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon

const GuessNumberGame = ({ closeModal, logo, instructions, bgColor }) => {
  const generateRandomNumber = () => {
    let maxRange;
    switch (difficulty) {
      case "easy":
        maxRange = 50;
        break;
      case "medium":
        maxRange = 100;
        break;
      case "hard":
        maxRange = 200;
        break;
      default:
        maxRange = 100;
    }
    return Math.floor(Math.random() * maxRange) + 1;
  };

  const [attempts, setAttempts] = useState(0);
  const [guessNumber, setGuessNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);
  const [hint, setHint] = useState("");
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [scoreboard, setScoreboard] = useState([]);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          handleGameOver();
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleHint = () => {
    Alert.alert("Hint", hint, [{ text: "OK" }]);
  };

  const handleGuess = () => {
    if (gameOver) return;
    const guess = parseInt(userGuess);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback("Invalid guess. Please enter a number between 1 and 100.");
      return;
    }

    setAttempts((prevAttempts) => prevAttempts + 1);

    if (guess === guessNumber) {
      setFeedback(
        `Congratulations! You guessed the number ${guessNumber} in ${
          attempts + 1
        } attempts.`
      );
      handleGameOver();
      animateFeedback();
      updateScoreboard();
    } else {
      const message =
        guess < guessNumber ? "Too low! Try again." : "Too high! Try again.";
      setFeedback(message);
      setUserGuess("");
      setHint(
        guess < guessNumber ? "The number is higher" : "The number is lower"
      );
    }
  };

  const animateFeedback = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleGameOver = () => {
    setGameOver(true);
    setTimeLeft(0);
  };

  const handleRestart = () => {
    setGuessNumber(generateRandomNumber());
    setAttempts(0);
    setUserGuess("");
    setTimeLeft(30);
    setHint("");
    setFeedback("");
    setGameOver(false);
  };

  const updateScoreboard = () => {
    const newScore = {
      date: new Date().toLocaleDateString(),
      difficulty: difficulty,
      attempts: attempts + 1,
    };
    setScoreboard([...scoreboard, newScore]);
  };

  const difficultyOptions = ["easy", "medium", "hard"];

  return (
    <View style={styles.container}>
      <Icon
        name="times"
        size={24}
        color="#fff"
        style={styles.closeIcon}
        onPress={closeModal}
      />
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>

      <Text style={styles.instructionText}>{instructions}</Text>
      <Text style={styles.timerText}>Time Left: {timeLeft} seconds</Text>
      <Text style={styles.attemptsText}>Attempts: {attempts}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your guess"
          keyboardType="numeric"
          value={userGuess}
          onChangeText={setUserGuess}
          editable={!gameOver}
          keyboardAppearance="dark"
        />
        {!gameOver && (
          <Button mode="contained" onPress={handleGuess} style={styles.button}>
            Make Guess
          </Button>
        )}
        <Button
          onPress={handleRestart}
          style={[
            styles.button,
            { backgroundColor: "red", display: gameOver ? "flex" : "none" },
          ]}
        >
          <Text style={{ color: "white" }}>Restart</Text>
        </Button>
        <Button
          onPress={handleHint}
          style={[
            styles.button,
            { backgroundColor: "#rgb(255,144,77)", display: gameOver ? "none" : "flex" },
          ]}
        >
          <Text style={{ color: "white" }}>Hint</Text>
        </Button>
<Animated.Text style={styles.feedback}>
          {feedback}
        </Animated.Text>
      </View>

      <View style={styles.difficultyContainer}>
        {difficultyOptions.map((option) => (
          <Button
            key={option}
            mode="contained"
            onPress={() => setDifficulty(option)}
            style={[
              styles.difficultyButton,
              { backgroundColor: difficulty === option ? "#rgb(255,144,77)" : "#ccc" },
            ]}
          >
            {option.toUpperCase()}
          </Button>
        ))}
      </View>

      <View style={styles.scoreboardContainer}>
        <Text style={styles.scoreboardTitle}>Scoreboard</Text>
        {scoreboard.map((score, index) => (
          <Text key={index} style={styles.scoreboardItem}>
            {score.date} - Difficulty: {score.difficulty}, Attempts: {score.attempts}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  closeIcon: {
    color: "#fff",
    position: "absolute",
    right: 10,
    top:10,
    zIndex:1,
  },
  header: {
    backgroundColor: "#rgb(255,144,77)",
    width: "100%",
    alignSelf: "center",
    marginTop: 0,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  instructionText: {
    marginBottom: 20,
    fontSize: 14,
    letterSpacing: 1,
    textAlign: "center",
    color: "#000",
    padding: 5,
  },
  timerText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
    fontWeight: "900",
  },
  attemptsText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#fff",
    fontWeight: "900",
    position: "absolute",
    top: 10,
    left: 10,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: "black",
  },
  feedback: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  difficultyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  scoreboardContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  scoreboardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scoreboardItem: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default GuessNumberGame;
