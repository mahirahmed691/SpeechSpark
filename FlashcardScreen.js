import { Platform, SafeAreaView, Text, FlatList, TouchableWithoutFeedback, View, Image} from "react-native";
import { flashcardsData } from "./flashcardData";
import styles from "./styles";
const FlashcardScreen = ({ route, navigation }) => {
  const { params } = route;

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

  const { title, onAddTile } = params;
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
      <FlatList
        data={flashcards}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Flashcard", { item });
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

export default FlashcardScreen;