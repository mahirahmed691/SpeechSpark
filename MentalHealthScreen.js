import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import EmojiSelector from "react-native-emoji-selector";
import Modal from "react-native-modal";

const commonEmojis = ["😊", "😢", "😡", "😴"];

const MentalHealthScreen = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [note, setNote] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [isBreathingModalVisible, setIsBreathingModalVisible] = useState(false);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [isBreathingExerciseInProgress, setBreathingExerciseInProgress] =
    useState(false);

  const startBreathingExercise = () => {
    setBreathingModalVisible(true);
    setBreathingTimer(4); // Initial timer value for the first phase
    setBreathingExerciseInProgress(true);
  };

  const stopBreathingExercise = () => {
    setBreathingModalVisible(false);
    setBreathingTimer(0);
    setBreathingExerciseInProgress(false);
  };

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
    // Implement your logic to save the mood, note, sleep hours, and wake-up time
    console.log("Selected Emoji:", selectedEmoji);
    console.log("Note:", note);
    console.log("Sleep Hours:", sleepHours);
    console.log("Wake-up Time:", wakeUpTime);

    // You can send this data to your backend or store it locally as needed
  };

  const toggleBreathingModal = () => {
    setIsBreathingModalVisible(!isBreathingModalVisible);
  };

  useEffect(() => {
    let interval;
    if (isBreathingExerciseInProgress) {
      interval = setInterval(() => {
        setBreathingTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (breathingTimer === 0) {
      clearInterval(interval);
      // Handle transition to the next phase or end of the exercise
      // You can add logic for transitioning between inhale, hold, exhale phases
    }

    // Cleanup the interval on component unmount or when not in progress
    return () => clearInterval(interval);
  }, [breathingTimer, isBreathingExerciseInProgress]);

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
            Explore tips for maintaining good mental health. Take breaks,
            practice mindfulness, and engage in activities that bring joy and
            relaxation.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mindfulness Meditation</Text>
          <Text style={styles.content}>
            Immerse yourself in guided mindfulness meditations to relax and
            focus on the present moment. Find a quiet space, close your eyes,
            and let the meditation guide you.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mood Tracker</Text>
          <Text style={styles.content}>
            Log your mood and add a note to keep track of your emotional
            well-being.
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
            <TextInput
              style={[styles.input, styles.noteInput]}
              multiline
              placeholder="Write a note..."
              value={note}
              onChangeText={(text) => setNote(text)}
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveMood}>
            <Text style={styles.saveButtonText}>Save Mood</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sleep Tracker</Text>
          <Text style={styles.content}>
            Track your sleep hours and wake-up time to monitor your sleep
            patterns.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Sleep Hours (e.g., 7.5)"
            keyboardType={Platform.OS === "ios" ? "decimal-pad" : "numeric"}
            value={sleepHours}
            onChangeText={(text) => setSleepHours(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Wake-up Time (e.g., 07:30 AM)"
            value={wakeUpTime}
            onChangeText={(text) => setWakeUpTime(text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Breathing Exercise</Text>
          <Text style={styles.content}>
            Practice deep breathing to relax your mind and body.
          </Text>
          <TouchableOpacity
            style={styles.breathingButton}
            onPress={toggleBreathingModal}
          >
            <Text style={styles.breathingButtonText}>
              Start Breathing Exercise
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={isBreathingModalVisible}
          onBackdropPress={toggleBreathingModal}
        >
          <View style={styles.breathingModalContainer}>
            <Text style={styles.breathingModalTitle}>
              Deep Breathing Exercise
            </Text>
            <Text style={styles.breathingModalInstructions}>
              Breathe in deeply for 4 seconds, hold for 4 seconds, and exhale
              for 4 seconds. Repeat.
            </Text>
          </View>
        </Modal>
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
    width: 250,
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
    fontSize: 30,
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
  noteInput: {
    height: 80,
  },
  input: {
    height: 40,
    borderColor: "#1E90FF",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: "#333",
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
  breathingButton: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  breathingButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  breathingExerciseText: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
  },

  breathingButton: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  breathingButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  breathingModalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  breathingModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  breathingModalInstructions: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  startBreathingButton: {
    backgroundColor: "#1E90FF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  startBreathingButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default MentalHealthScreen;
