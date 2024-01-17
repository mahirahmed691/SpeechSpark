import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import EmojiSelector from "react-native-emoji-selector";

const commonEmojis = ["😊", "😢", "😡", "😴"];

const MentalHealthScreen = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    // Fetch dynamic quotes about mental health from an API
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          "https://api.example.com/mental-health-quotes"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }

        const data = await response.json();
        setQuotes(data.quotes); // Assuming the API returns an array of quotes
      } catch (error) {
        console.error("Error fetching quotes:", error.message);
      }
    };

    fetchQuotes();
  }, []);

  const handleSaveMood = () => {
    // Implement your logic to save the mood and note
    console.log("Selected Emoji:", selectedEmoji);
    console.log("Note:", note);

    // You can send this data to your backend or store it locally as needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Mental Well-Being</Text>

        {quotes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quotes About Mental Health</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {quotes.map((quote, index) => (
                <View key={index} style={styles.quoteCard}>
                  <Text style={styles.quoteText}>{quote}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Tips</Text>
          <Text style={styles.content}>
            Explore tips for maintaining good mental health. Take breaks, practice
            mindfulness, and engage in activities that bring joy and relaxation.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mindfulness Meditation</Text>
          <Text style={styles.content}>
            Immerse yourself in guided mindfulness meditations to relax and focus
            on the present moment. Find a quiet space, close your eyes, and let
            the meditation guide you.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood Tracker</Text>
          <Text style={styles.content}>
            Log your mood and add a note to keep track of your emotional well-being.
          </Text>
          <View style={styles.emojiSelector}>
            {commonEmojis.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.emojiButton,
                  selectedEmoji === emoji && styles.selectedEmojiButton,
                ]}
                onPress={() => setSelectedEmoji(emoji)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.noteContainer}>
            <Text style={styles.noteLabel}>Add a note (optional)</Text>
            <Text style={styles.noteText}>{note}</Text>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveMood}>
            <Text style={styles.saveButtonText}>Save Mood</Text>
          </TouchableOpacity>
        </View>

        {/* Add more sections and features as needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E90FF",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  quoteCard: {
    backgroundColor: "#D1EAF5",
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    width: 250, // Adjust width as needed
  },
  quoteText: {
    fontSize: 14,
    color: "#1E90FF",
  },
  emojiSelector: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 12,
  },
  emojiButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  selectedEmojiButton: {
    backgroundColor: "#1E90FF",
  },
  emojiText: {
    fontSize: 20,
  },
  noteContainer: {
    marginBottom: 12,
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  noteText: {
    fontSize: 14,
    color: "#555",
  },
  saveButton: {
    backgroundColor: "#1E90FF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default MentalHealthScreen;
