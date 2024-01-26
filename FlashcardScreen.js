// FlashcardScreen.js
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";
import { flashcardsData } from "./flashcardData";
import { Button } from "react-native-paper";
import styles from "./styles";

const FlashcardScreen = ({ route, navigation }) => {
  const { params } = route;
  const [isTileView, setIsTileView] = useState(false);
  const [key, setKey] = useState("tileViewKey");

  const toggleViewMode = () => {
    setIsTileView(!isTileView);
    setKey((prevKey) =>
      prevKey === "tileViewKey" ? "listViewKey" : "tileViewKey"
    );
  };

  const isIpad = Platform.OS === "ios" && Platform.isPad;

  if (!params || !params.title || !flashcardsData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: isIpad ? 300 : 200 }}>
          <Image
            source={{
              uri: "https://cdn.dribbble.com/userupload/4156800/file/original-4ddbc7d8125bd5b293c122ab1f1ddcbc.png?resize=1504x1272",
            }}
            style={styles.image}
          />
          <Text style={styles.NoCardText}>No Deck Selected</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { title } = params;
  const flashcards = flashcardsData[title] || [];

  if (!flashcards) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.cardText}>
          No flashcards available for this deck
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.cardText}>{`Flashcards for ${title}`}</Text>
      <TouchableOpacity onPress={toggleViewMode} style={styles.toggleButtonContainer}>
        <IconButton
          icon={isTileView ? "view-list" : "view-grid"}
          color="#fff"
          size={30} 
          style={styles.toggleViewButton}
        />
      </TouchableOpacity>
      <FlatList
        key={key}
        data={flashcards}
        keyExtractor={(item) => item?.id?.toString()}
        numColumns={isTileView ? 3 : 1}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Flashcard", { item });
            }}
          >
            {isTileView ? (
              <View style={styles.visualFlashcardTile}>
                <Image
                  source={{ uri: item?.image }}
                  style={styles.visualFlashcardImageTile}
                />
                <Text style={styles.visualFlashcardImageTitle}>
                  {item?.title}
                </Text>
              </View>
            ) : (
              <View style={styles.visualFlashcard}>
                <Image
                  source={{ uri: item?.image }}
                  style={styles.visualFlashcardImage}
                />
                <Text style={styles.visualFlashcardTitle}>{item?.title}</Text>
              </View>
            )}
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
};

export default FlashcardScreen;
