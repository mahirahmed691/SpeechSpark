import React, { useState, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  FlatList,
  Image,
  View,
} from "react-native";
import LottieView from "lottie-react-native"; // Import LottieView
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon
import { SafeAreaView } from "react-native-safe-area-context";
import GuessNumberGame from "../games/GuessNumberGame"; // Import the GuessNumberGame component
import WordGuessGame from "../games/WordGuessGame"; // Import the WordGuessGame component
import ColorMatchingGame from "../games/ColorMatchGame"; // Import the ColorMatchingGame component
import MathQuizGame from "../games/MathQuiz"; // Import the MathQuizGame component
import DrawingGame from "../games/DrawingGame";
import TicTacToe from "../games/TicTacToe";
import ChessGame from "../games/ChessGame";

const GamesScreen = () => {
  const gamesList = [
    {
      id: "1",
      image: require("../../assets/guesswhatnumber.jpeg"),
      title: "Guess 0 Mania",
      genre: "Strategy",
      instructions:
        "Try to guess the hidden number between 1 and 100 within the fewest attempts possible!",
      navigateTo: "GuessNumberGame",
      bgColor: "#f0f0f0",
    },
    {
      id: "2",
      image: require("../../assets/whatword.jpeg"),
      title: "Words?",
      genre: "English",
      instructions: "Try to guess the hidden word from the given options!",
      navigateTo: "WordGuessGame",
      bgColor: "#f0f0f0",
    },
    {
      id: "3",
      image: require("../../assets/colormatch.png"),
      title: "Match",
      genre: "Memory",
      instructions: "Match the color combination as quickly as possible!",
      navigateTo: "ColorMatchingGame",
      bgColor: "#rgb(255,87,87)",
    },
    {
      id: "4",
      image: require("../../assets/mathquiz.png"),
      title: "Math Camp",
      genre: "Quiz",
      instructions: "Solve the math problems within the time limit!",
      navigateTo: "MathQuizGame",
      bgColor: "#f0f0f0",
    },
    {
      id: "5",
      image: require("../../assets/drawthis.png"),
      title: "The Colouring Book",
      genre: "Art",
      instructions: "Draw something amazing!",
      navigateTo: "DrawingGame",
      bgColor: "#FFF",
    },
    {
      id: "6",
      image: require("../../assets/tictactoe.jpeg"),
      title: "Tic Tac Toe",
      genre: "Puzzle",
      navigateTo: "TicTacToe",
      bgColor: "#FFF",
    },
    {
      id: "7",
      image: require("../../assets/chess.png"),
      title: "Check Mate",
      genre: "Strategy",
      navigateTo: "ChessGame",
      bgColor: "#FFF",
    },
  ];

  const [selectedGame, setSelectedGame] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleGameSelection = (game) => {
    setSelectedGame(game);
    setModalVisible(true);
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

  const filteredGames = gamesList.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require("../../assets/animation.json")}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search games..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholderTextColor="#000"
        />
      </View>

      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleGameSelection(item)}
            style={styles.gameItem}
          >
            <Text style={styles.gameTitle}>{item.title}</Text>
            <Image source={item.image} style={styles.gameImage} />
            <Text style={styles.gameGenre}>{item.genre}</Text>
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
          <SafeAreaView
            style={[
              styles.modalContent,
              { backgroundColor: selectedGame?.bgColor || "#FF904D" },
            ]}
          >
            {selectedGame && selectedGame.navigateTo === "GuessNumberGame" && (
              <GuessNumberGame
                closeModal={closeModal}
                logo={require("../../assets/guesswhatnumber.png")}
                instructions={selectedGame.instructions}
                bgColor={selectedGame.bgColor}
              />
            )}
            {selectedGame && selectedGame.navigateTo === "WordGuessGame" && (
              <WordGuessGame
                closeModal={closeModal}
                logo={require("../../assets/whatword.png")}
              />
            )}
            {selectedGame &&
              selectedGame.navigateTo === "ColorMatchingGame" && (
                <ColorMatchGame
                  closeModal={closeModal}
                  logo={logo}
                  instructions={instructions}
                />
              )}
            {selectedGame && selectedGame.navigateTo === "MathQuizGame" && (
              <MathQuizGame
                closeModal={closeModal}
                logo={require("../../assets/mathquiz.png")}
              />
            )}
            {selectedGame && selectedGame.navigateTo === "TicTacToe" && (
              <TicTacToe closeModal={closeModal} />
            )}
            {selectedGame && selectedGame.navigateTo === "DrawingGame" && (
              <DrawingGame closeModal={closeModal} />
            )}
            {selectedGame && selectedGame.navigateTo === "ChessGame" && (
              <ChessGame closeModal={closeModal} />
            )}
          </SafeAreaView>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    color: "#333",
    backgroundColor: "#fff",
  },
  gameItem: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
    elevation: 3,
  },
  gameImage: {
    width: "100%",
    height: 150,
  },
  gameTitle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  gameGenre: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "crimson",
    color: "white",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    paddingTop: 80,
    backgroundColor: "#FF904D",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    height: "100%",
  },
});

export default GamesScreen;