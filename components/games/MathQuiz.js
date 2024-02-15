import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import AntDesign icons

const MathQuiz = ({ closeModal }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [operation, setOperation] = useState("+"); // Default operation is addition
  const [animation] = useState(new Animated.Value(0));
  const [feedback, setFeedback] = useState(null); // Feedback for user's answer

  useEffect(() => {
    generateNewQuestion();
  }, [level, score]);

  const generateNewQuestion = () => {
    let min = 1;
    let max = 10;
    if (level > 1) {
      min = 10 * (level - 1);
      max = 10 * level;
    }
    // Adjust the range of possible numbers based on the level
    setNum1(Math.floor(Math.random() * (max - min + 1)) + min);
    setNum2(Math.floor(Math.random() * (max - min + 1)) + min);

    const operations = ["+", "-", "x", "/"];
    const randomIndex = Math.floor(Math.random() * operations.length);
    setOperation(operations[randomIndex]);

    setAnswer("");
    setFeedback(null); // Reset feedback
    Keyboard.dismiss();
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const checkAnswer = () => {
    // Check if the answer is empty or not a number
    if (!answer || isNaN(answer)) {
      // Optionally, you can provide feedback to the user
      setFeedback("Please enter a valid number");
      return; // Exit the function if the answer is empty or not a number
    }

    // Convert the answer to a number
    const userAnswer = parseInt(answer);

    // Calculate the correct answer based on the operation
    let correctAnswer;
    if (operation === "+") {
      correctAnswer = num1 + num2;
    } else if (operation === "-") {
      correctAnswer = num1 - num2;
    } else if (operation === "x") {
      correctAnswer = num1 * num2;
    } else if (operation === "/") {
      // Division by zero check
      if (num2 === 0) {
        // Optionally, you can provide feedback to the user
        setFeedback("Cannot divide by zero");
        return; // Exit the function if attempting to divide by zero
      }
      correctAnswer = num1 / num2;
    }

    // Check if the user's answer matches the correct answer
    if (userAnswer === correctAnswer) {
      // Update the score and trigger animation
      setScore(score + level * 10);
      setFeedback("Correct!");
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      setFeedback("Incorrect! Try again.");
    }
  };

  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Animated.Text style={[styles.score, animatedStyle]}>
            Score: {score}
          </Animated.Text>
          <Text style={styles.level}>Level: {level}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <MaterialCommunityIcons name="close" size={24} color="#ff4500" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.question}>
          {num1} {operation} {num2} =
        </Text>
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={setAnswer}
          keyboardType="numeric"
          placeholder="Your Answer"
          placeholderTextColor="#aaa"
        />
        {feedback && <Text style={styles.feedback}>{feedback}</Text>}
        <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
          <Text style={styles.submitButtonText}>Check</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: "transparent",
  },
  score: {
    fontSize: 24,
    color: "#ff4500",
    fontFamily: "Futura",
  },
  body: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  question: {
    fontSize: 32,
    marginBottom: 20,
    color: "#ff4500",
    fontFamily: "Futura",
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ff4500",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#ff4500",
    fontFamily: "Futura",
  },
  submitButton: {
    backgroundColor: "#ff4500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Futura",
  },
  level: {
    marginTop: 10,
    fontSize: 20,
    color: "#ff4500",
    fontFamily: "Futura",
  },
  feedback: {
    fontSize:18,
    marginBottom:10,
    color: "#ff0000",
    fontFamily: "Futura",
  },
});

export default MathQuiz;
