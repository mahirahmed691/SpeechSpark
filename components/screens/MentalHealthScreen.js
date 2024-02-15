import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Vibration,
} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import Modal from "react-native-modal";

const SECTION_HEIGHT = 320;
const commonEmojis = ["😊", "😢", "😡", "😴"];

const WellnessTipsModal = ({ isVisible, onClose }) => {
  const wellnessTips = [
    {
      text: "Tip 1: Take breaks and stretch regularly.",
      image:
        "https://cdn.dribbble.com/users/1138814/screenshots/16521383/media/331e7b8717ac697f7f9a4865462be078.jpeg?resize=1600x1200&vertical=center", // Replace with actual image URL
    },
    {
      text: "Tip 2: Practice mindfulness meditation for 5 minutes each day.",
      image:
        "https://cdn.dribbble.com/users/101577/screenshots/3144269/media/9a0edd9209d2430f4118d607f18e1ce7.gif", // Replace with actual image URL
    },
    {
      text: "Tip 3: Engage in activities that bring joy and relaxation.",
      image:
        "https://cdn.dribbble.com/users/1147613/screenshots/14992197/media/533b657f9bf9cb764b7934e1be1aee05.png?resize=1600x1200&vertical=center", // Replace with actual image URL
    },
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.fullScreenModal}
    >
      <SafeAreaView style={styles.wellnessTipContent}>
        <Text style={styles.wellnessModalTitle}>Wellness Tips</Text>
        <ScrollView>
          {wellnessTips.map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <Text style={styles.modalTipText}>{tip.text}</Text>
              <Image source={{ uri: tip.image }} style={styles.tipImage} />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
          <Text style={styles.closeModalButtonText}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

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
  const [sleepQuality, setSleepQuality] = useState(0);
  const [isWellnessTipsModalVisible, setIsWellnessTipsModalVisible] =
    useState(false);

  let vibrationInterval;

  const handleShowWellnessTips = () => {
    setIsWellnessTipsModalVisible(true);
  };

  const handleCloseWellnessTips = () => {
    setIsWellnessTipsModalVisible(false);
  };

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

  const handleSaveSleepTracking = () => {
    console.log("Sleep Hours:", sleepHours);
    console.log("Wake-up Time:", wakeUpTime);
    // You can add logic here to save sleep tracking data to your backend or store it locally
  };

  useEffect(() => {
    // Fetch dynamic quotes about mental health from an API
    const fetchQuotes = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");

        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }

        const data = await response.json();
        setQuotes([data.content]);
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
    }

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
      {quotes.length > 0 && (
        <View style={styles.section}>
          <View horizontal showsHorizontalScrollIndicator={false}>
            {quotes.map((quote, index) => (
              <View key={index} style={styles.quoteCard}>
                <Text style={styles.quoteText}>{quote}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Tips</Text>
          <Text style={styles.content}>
            Explore tips for maintaining good mental health. Take breaks,
            practice mindfulness, and engage in activities that bring joy and
            relaxation.
          </Text>
          <TouchableOpacity
            style={styles.showTipsButton}
            onPress={handleShowWellnessTips}
          >
            <Text style={styles.showTipsButtonText}>Show More Details</Text>
          </TouchableOpacity>
        </View>

        <WellnessTipsModal
          isVisible={isWellnessTipsModalVisible}
          onClose={handleCloseWellnessTips}
        />

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
            Track your sleep hours, wake-up time, and sleep quality to monitor
            your sleep patterns.
          </Text>
          <View style={styles.sleepTrackerInputContainer}>
            <TextInput
              style={[styles.input, styles.sleepTrackerInput]}
              placeholder="Sleep Hours (e.g., 7.5)"
              keyboardType="numeric" // Use numeric keyboard for sleep hours
              value={sleepHours}
              onChangeText={(text) => {
                // Allow only numbers and a single dot for decimal
                setSleepHours(text.replace(/[^0-9.]/g, ""));
              }}
            />
            <TextInput
              style={[styles.input, styles.sleepTrackerInput]}
              placeholder="Wake-up Time (e.g., 07:30 AM)"
              keyboardType="numeric" // Use numeric keyboard for wake-up time
              value={wakeUpTime}
              onChangeText={(text) => {
                // Allow only numbers and colon for time format
                setWakeUpTime(text.replace(/[^0-9:]/g, ""));
              }}
            />
          </View>
          <View style={styles.sleepQualityContainer}>
            <Text style={styles.sleepQualityLabel}>Sleep Quality:</Text>
            {[1, 2, 3, 4, 5].map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.sleepQualityButton,
                  sleepQuality === rating && styles.selectedSleepQualityButton,
                ]}
                onPress={() => setSleepQuality(rating)}
              >
                <Text style={styles.sleepQualityButtonText}>{rating}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveSleepTracking}
          >
            <Text style={styles.saveButtonText}>Save Sleep Data</Text>
          </TouchableOpacity>
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
