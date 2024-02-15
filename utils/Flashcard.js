import React from "react";
import { Text, Animated } from "react-native";
import styles from "./../components/screens/styles";

const Flashcard = ({ text, animatedValue }) => {
  const animatedStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 9],
          outputRange: [0.8, 1],
        }),
      },
    ],
    width: "33%",
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Text style={styles.dateText}>{text}</Text>
    </Animated.View>
  );
};

export default Flashcard;
