// ExpandedFlashcardScreen.js
import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { Constants } from "expo";
import { styles } from "./Styles";

const ExpandedFlashcardScreen = ({ route }) => {
  const { item } = route.params || {};
  const isIpad =
    Constants.platform?.ios?.model?.toLowerCase?.().includes?.("ipad") ?? false;
  if (!item) {
    return (
      <SafeAreaView style={styles.ExpandContainer}>
        <View style={{ marginTop: isIpad ? 300 : 200 }}>
          <Image
            source={{
              uri: "https://cdn.dribbble.com/users/1040983/screenshots/4870530/media/a6ad9466ae81789d22439d56a31dafd2.png?resize=800x600&vertical=center",
            }}
            style={styles.image}
          />
          <Text style={styles.NoCardText}>No Flashcard Selected</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.ExpandContainer}>
      <Text style={styles.expandedFlashcardTitle}>{item.title}</Text>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.expandedFlashcardImage}
      ></ImageBackground>
    </SafeAreaView>
  );
};

export { ExpandedFlashcardScreen };
