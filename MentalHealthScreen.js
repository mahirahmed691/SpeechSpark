import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Vibration,
} from "react-native";
import {  TextInput} from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import Modal from "react-native-modal";

const SECTION_HEIGHT = 300;
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
  const [activities, setActivities] = useState([]);
  const [activityText, setActivityText] = useState("");
  const [gratitudeEntries, setGratitudeEntries] = useState([]);
  const [gratitudeText, setGratitudeText] = useState("");

  let vibrationInterval;

  const startBreathingExercise = () => {
    setIsBreathingModalVisible(true);
    setBreathingTimer(120);
    setBreathingExerciseInProgress(true);

    vibrationInterval = setInterval(() => {
      if (breathingTimer % 4 === 0) {
        Vibration.vibrate(200);
      }
      setBreathingTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  };

  const stopBreathingExercise = () => {
    setIsBreathingModalVisible(false);
    setBreathingTimer(0);
    setBreathingExerciseInProgress(false);

    // Stop vibration when the exercise is stopped
    Vibration.cancel();
    clearInterval(vibrationInterval);
  };

  const handleAddActivity = () => {
    if (activityText.trim() !== "") {
      setActivities((prevActivities) => [
        ...prevActivities,
        { id: Date.now(), text: activityText.trim() },
      ]);
      setActivityText("");
    }
  };

  const handleAddGratitudeEntry = () => {
    if (gratitudeText.trim() !== "") {
      setGratitudeEntries((prevEntries) => [
        ...prevEntries,
        { id: Date.now(), text: gratitudeText.trim() },
      ]);
      setGratitudeText("");
    }
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
    console.log("Selected Emoji:", selectedEmoji);
    console.log("Note:", note);
    console.log("Sleep Hours:", sleepHours);
    console.log("Wake-up Time:", wakeUpTime);
    console.log("Activities:", activities);
    console.log("Gratitude Entries:", gratitudeEntries);

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

  const SectionNavigator = ({ onPress, title, iconName, iconColor }) => (
    <TouchableOpacity style={styles.navigatorButton} onPress={onPress}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Icon name={iconName} size={20} color={iconColor} />
        <Text style={styles.navigatorButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  const scrollViewRef = React.createRef();

  const scrollToSection = (sectionId) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: sectionId * SECTION_HEIGHT,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.title}>Mental Wellbeing</Text>
        <View style={styles.sectionNavigator}>
          <SectionNavigator
            onPress={() => scrollToSection(1)}
            title="Quotes"
            iconName="comment-quote"
            iconColor={"#FFF"}
          />
          <SectionNavigator
            onPress={() => scrollToSection(2)}
            title="Wellness Tips"
            iconName="brain"
            iconColor={"#FFF"}
          />
          <SectionNavigator
            onPress={() => scrollToSection(3)}
            title="Mindfulness Meditation"
            iconName="meditation"
            iconColor={"#FFF"}
          />
          <SectionNavigator
            onPress={() => scrollToSection(4)}
            title="Mood Tracker"
            iconName="robot-happy"
            iconColor={"#FFF"}
          />
          <SectionNavigator
            onPress={() => scrollToSection(5)}
            title="Sleep Tracker"
            iconName="power-sleep"
            iconColor={"#FFF"}
          />
          <SectionNavigator
            onPress={() => scrollToSection(6)}
            title="Breathing Exercise"
            iconName="air-purifier"
            iconColor={"#FFF"}
          />
          <SectionNavigator
            onPress={() => scrollToSection(7)}
            title="Activity Log"
            iconName="book-open"
            iconColor={"#FFF"}
          />
          <SectionNavigator
            onPress={() => scrollToSection(8)}
            title="Gratitude Journal"
            iconName="cards-heart-outline"
            iconColor={"#FFF"}
          />
        </View>

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
              style={[styles.input, styles.textInput]}
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
           style={[styles.input, styles.textInput]}
            placeholder="Sleep Hours (e.g., 7.5)"
            keyboardType={Platform.OS === "ios" ? "decimal-pad" : "numeric"}
            value={sleepHours}
            onChangeText={(text) => setSleepHours(text)}
          />
          <TextInput
            style={[styles.input, styles.textInput]}
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
            onPress={startBreathingExercise}
          >
            <Text style={styles.breathingButtonText}>
              Start Breathing Exercise
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={isBreathingModalVisible}
          onBackdropPress={stopBreathingExercise}
        >
          <View style={styles.breathingModalContainer}>
            <Text style={styles.breathingModalTitle}>
              Deep Breathing Exercise
            </Text>
            <Text style={styles.breathingModalInstructions}>
              Breathe in deeply for 4 seconds, hold for 4 seconds, and exhale
              for 4 seconds. Repeat.
            </Text>
            <Text style={styles.breathingModalTimer}>
              {breathingTimer} seconds remaining
            </Text>
          </View>
        </Modal>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Log</Text>
          <Text style={styles.content}>
            Log your daily activities and categorize them based on their impact
            on mood.
          </Text>
          <TextInput
            style={[styles.input, styles.textInput]}
            placeholder="Add an activity..."
            value={activityText}
            onChangeText={(text) => setActivityText(text)}
          />
          <TouchableOpacity
            style={styles.breathingButton}
            onPress={handleAddActivity}
          >
            <Text style={styles.buttonText}>Add Activity</Text>
          </TouchableOpacity>
          {activities.length > 0 && (
            <ScrollView style={styles.logContainer}>
              {activities.map((activity) => (
                <View key={activity.id} style={styles.logItem}>
                  <Text style={styles.logText}>{activity.text}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gratitude Journal</Text>
          <Text style={styles.content}>
            Reflect on positive aspects of your day by jotting down moments of
            gratitude.
          </Text>
          <TextInput
           style={[styles.input, styles.textInput]}
            placeholder="What are you grateful for?"
            value={gratitudeText}
            onChangeText={(text) => setGratitudeText(text)}
          />
          <TouchableOpacity
            style={styles.breathingButton}
            onPress={handleAddGratitudeEntry}
          >
            <Text style={styles.buttonText}>Add Entry</Text>
          </TouchableOpacity>
          {gratitudeEntries.length > 0 && (
            <ScrollView style={styles.logContainer}>
              {gratitudeEntries.map((entry) => (
                <View key={entry.id} style={styles.logItem}>
                  <Text style={styles.logText}>{entry.text}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MentalHealthScreen;