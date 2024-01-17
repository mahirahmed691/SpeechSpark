import React from "react";
import { SafeAreaView, View, Text, FlatList, TouchableWithoutFeedback, Image } from "react-native";
import PropTypes from 'prop-types';
import { flashcardsData } from "./flashcardData";
import { styles } from "./Styles";

const FlashcardScreen = ({ route, navigation }) => {
  const isIpad = Constants.platform?.ios?.model?.toLowerCase()?.includes("ipad") ?? false;
  const { params } = route;

  const renderNoDeckSelected = () => (
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

  const renderNoFlashcards = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.cardText}>
        No flashcards available for this deck
      </Text>
    </SafeAreaView>
  );

  if (!(params && params.title && flashcardsData)) {
    return renderNoDeckSelected();
  }

  const { title, onAddTile } = params;
  const flashcards = flashcardsData[title] || [];

  if (!flashcards) {
    return renderNoFlashcards();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.cardText}>{`Flashcards for ${title}`}</Text>
      <FlatList
        data={flashcards}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("ExpandedFlashcard", { item });
            }}
          >
            <View style={styles.visualFlashcard}>
              <Image
                source={{ uri: item?.image }}
                style={styles.visualFlashcardImage}
              />
              <Text style={styles.visualFlashcardTitle}>{item?.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
};

FlashcardScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export { FlashcardScreen };
