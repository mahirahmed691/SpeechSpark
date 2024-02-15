import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from "react-native";

const ColorMatchGame = ({ closeModal, logo, instructions, bgColor }) => {
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "pink",
    "cyan",
    "brown",
    "gray",
  ]; 
  let initialTiles = colors.concat(colors); 
  initialTiles = initialTiles.slice(0, 20); 

  const [tiles, setTiles] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [flipAnimation, setFlipAnimation] = useState(new Animated.Value(0));
  const [matchedAnimation, setMatchedAnimation] = useState(
    new Animated.Value(0)
  );
  const [timeLeft, setTimeLeft] = useState(60); 
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("medium"); 
  const difficultySettings = {
    easy: { numTiles: 6, timerDuration: 90 },
    medium: { numTiles: 10, timerDuration: 60 },
    hard: { numTiles: 10, timerDuration: 45 }, 
  };

  useEffect(() => {
    setTiles(shuffle(initialTiles));
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

  useEffect(() => {
    if (matchedIndices.length === tiles.length) {
      handleGameWin();
    }
  }, [matchedIndices]);

  useEffect(() => {
    setTiles(
      shuffle(initialTiles.slice(0, difficultySettings[difficulty].numTiles))
    );
    setTimeLeft(difficultySettings[difficulty].timerDuration);
  }, [difficulty]);

  const shuffle = (array) => {
    // Fisher-Yates shuffle algorithm
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

const handleTilePress = (index) => {
  if (matchedIndices.includes(index) || selectedIndices.includes(index)) {
    return;
  }

  setSelectedIndices((prevSelectedIndices) => {
    if (prevSelectedIndices.length === 2) {
      return [];
    }
    return [...prevSelectedIndices, index];
  });

  // If two tiles are selected
  if (selectedIndices.length === 1) {
    setAttempts(attempts + 1);

    // Check if the tiles match
    if (tiles[selectedIndices[0]] === tiles[index]) {
      // Update matched indices and reset selected indices
      setMatchedIndices([...matchedIndices, selectedIndices[0], index]);
      setSelectedIndices([]);
      // Animate the matched tile
      animateMatchedTile(index);
      setScore(score + 1);
    } else {
      setTimeout(() => {
        setSelectedIndices([]);
        animateFlipTile(index);
      }, 1000);
    }
  }
};


  const animateFlipTile = (index) => {
    Animated.timing(flipAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setFlipAnimation(new Animated.Value(0));
    });
  };

  const animateMatchedTile = (index) => {
    Animated.timing(matchedAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setMatchedAnimation(new Animated.Value(0));
    });
  };

  const handleGameOver = () => {
    // Handle game over logic here
  };

  const handleGameWin = () => {
    // Handle game win logic here
  };

  const renderTile = ({ item, index }) => {
    const isMatched = matchedIndices.includes(index);
    const isSelected = selectedIndices.includes(index);
    const rotateY = flipAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "90deg", "0deg"],
    });
    const opacity = matchedAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return (
      <TouchableOpacity
        style={[
          styles.tile,
          {
            backgroundColor: isMatched
              ? "transparent"
              : isSelected
              ? item
              : "white",
            transform: [{ rotateY }],
            opacity,
          },
        ]}
        onPress={() => handleTilePress(index)}
        disabled={isMatched}
      >
        {isMatched || isSelected ? null : (
          <Text style={styles.tileText}>?</Text>
        )}
      </TouchableOpacity>
    );
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Icon name="close" color={"#fff"} size={20} />
      </TouchableOpacity>

      <Text style={styles.instructionText}>{instructions}</Text>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.timerText}>Time Left: {timeLeft}</Text>

      <FlatList
        data={tiles}
        renderItem={renderTile}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.tilesContainer}
      />

      <View style={styles.difficultyContainer}>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "easy" && styles.selectedDifficulty,
          ]}
          onPress={() => handleDifficultyChange("easy")}
        >
          <Text style={styles.difficultyButtonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "medium" && styles.selectedDifficulty,
          ]}
          onPress={() => handleDifficultyChange("medium")}
        >
          <Text style={styles.difficultyButtonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "hard" && styles.selectedDifficulty,
          ]}
          onPress={() => handleDifficultyChange("hard")}
        >
          <Text style={styles.difficultyButtonText}>Hard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
  },
  instructionText: {
    marginBottom: 20,
    fontSize: 18,
    letterSpacing: 1,
    textAlign: "center",
    color: "#000",
  },
  scoreText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#fff",
    fontWeight: "900",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  timerText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#fff",
    fontWeight: "900",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  tilesContainer: {
    alignItems: "center",
    flexGrow: 1,
  },
  tile: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tileText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  difficultyButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  selectedDifficulty: {
    backgroundColor: "#007AFF",
  },
  difficultyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ColorMatchGame;
