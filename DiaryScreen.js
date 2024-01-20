import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  Image, // Import Image component from react-native
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import * as Location from "expo-location";
import axios from "axios";

const DiaryScreen = () => {
  const exampleQuestions = [
    {
      id: 1,
      text: "How did you feel today?",
      type: "text",
    },
    {
      id: 2,
      text: "What was the highlight of your day?",
      type: "text",
    },
    {
      id: 3,
      text: "Rate your overall mood on a scale from 1 to 10.",
      type: "radio",
      options: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
      ],
    },
    {
      id: 4,
      text: "Did you achieve your goals for the day?",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      id: 5,
      text: "What is one thing you learned today?",
      type: "text",
    },
    // Add more questions as needed
  ];
  const [diaryData, setDiaryData] = useState({
    selectedDate: new Date(),
    isPlaying: false,
    questions: exampleQuestions,
    responses: [],
  });
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();

  useEffect(() => {
    if (diaryData.location) {
      convertLocationToCity();
    }
  }, [diaryData.location]);

  useEffect(() => {
    // Assuming you have an API endpoint that provides questions
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("your_questions_api_endpoint");
        const questions = response.data; // Adjust this based on your API response structure
        setDiaryData({ ...diaryData, questions });
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleResponseChange = (index, response) => {
    const newResponses = [...diaryData.responses];
    newResponses[index] = response;
    setDiaryData({ ...diaryData, responses: newResponses });
  };

  const handleRadioResponseChange = (index, response) => {
    const newRadioResponses = [...diaryData.responses];
    newRadioResponses[index] = response;
    setDiaryData({ ...diaryData, responses: newRadioResponses });
  };

  const renderQuestions = () => {
    return diaryData.questions.map((question, index) => (
      <View key={question.id} style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.type === "text" ? (
          <TextInput
            style={styles.textInput}
            placeholder="Type your response here"
            value={diaryData.responses[index]}
            onChangeText={(value) => handleResponseChange(index, value)}
          />
        ) : question.type === "radio" ? (
          <RadioGroup
            radioButtons={question.options.map((option) => ({
              ...option,
              selected: diaryData.responses[index]?.value === option.value,
            }))}
            onPress={(value) => handleRadioResponseChange(index, value)}
            layout="row"
            containerStyle={{ marginTop: 8 }}
          />
        ) : null}
      </View>
    ));
  };

  const IconButton = ({
    onPress,
    iconName,
    buttonText,
    iconSize,
    iconColor,
    buttonColor,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonContainer, { backgroundColor: buttonColor }]}
      >
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
        <Text style={styles.datePickerText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("ImagePicker result:", result);

    if (!result.cancelled) {
      setDiaryData({ ...diaryData, selectedImage: result.uri });
    }
  };

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();

      if (!granted) {
        alert(
          "Sorry, we need audio recording permissions to make this work!"
        );
        return;
      }

      // Set audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (error) {
      console.error("Error starting recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setDiaryData({ ...diaryData, audioUri: uri });
        setRecording(null); // Reset the recording state
      } else {
        console.warn("No recording in progress to stop.");
      }
    } catch (error) {
      console.error("Error stopping recording", error);
    }
  };

  const playRecording = async () => {
    try {
      if (sound) {
        // Use the getProgressAsync function to check the status of the audio
        const status = await sound.getStatusAsync();
        if (!status.isLoaded) {
          console.warn("Sound is not loaded.");
          return;
        }

        if (status.isLoaded && !status.isPlaying) {
          await sound.playAsync();
          setDiaryData({ ...diaryData, isPlaying: true });
        } else {
          console.warn("Audio is already playing.");
        }
      }
    } catch (error) {
      console.error("Error playing recording", error);
    }
  };

  const stopPlayback = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        setDiaryData({ ...diaryData, isPlaying: false });
      }
    } catch (error) {
      console.error("Error stopping playback", error);
    }
  };

  const renderPlaybackButton = () => {
    if (diaryData.isPlaying) {
      return (
        <TouchableOpacity style={styles.buttonContainer} onPress={stopPlayback}>
          <Icon name="stop" size={20} color="#FE89A9" style={styles.icon} />
          <Text style={styles.buttonText}>Stop Playback</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={playRecording}
        >
          <Icon ame="play" size={20} color="#FE89A9" style={styles.icon} />
        </TouchableOpacity>
      );
    }
  };

  const convertLocationToCity = async () => {
    const { coords } = diaryData.location;
    const apiKey = "e0b0f59d76ea4bdb847dc83c9c1f6d06"; // Replace with your OpenCage API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${coords.latitude}+${coords.longitude}&pretty=1`;

    try {
      const response = await axios.get(apiUrl);
      const city = response.data.results[0].components.city;
      setDiaryData({ ...diaryData, city });
    } catch (error) {
      console.error("Error converting location to city", error);
    }
  };

  const captureLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need location permissions to make this work!");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setDiaryData({ ...diaryData, location });
    } catch (error) {
      console.error("Error capturing location", error);
    }
  };

  const saveDiaryEntry = () => {
    console.log("Date:", diaryData.selectedDate.toISOString());
    console.log("Text Responses:", diaryData.responses);
    console.log("Selected Image:", diaryData.selectedImage);
    console.log("Audio URI:", diaryData.audioUri);
    console.log("Location:", diaryData.location);
    console.log("City:", diaryData.city);
  };

  const onDateChange = (event, date) => {
    setDiaryData({
      ...diaryData,
      showDatePicker: Platform.OS === "ios",
      selectedDate: date || diaryData.selectedDate,
    });
  };

  const showDatepicker = () => {
    setDiaryData({ ...diaryData, showDatePicker: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.headerText}>My Digital Diary</Text>
        <View style={{ flexDirection: "row" }}>
          <IconButton
            iconName="map-marker"
            iconSize={20}
            iconColor="#FF89A9"
            onPress={captureLocation}
            buttonText={diaryData.city}
          />
            <IconButton
              iconName={recording ? "stop" : "microphone"}
              iconColor="#FE89A9"
              iconSize={20}
            />
            {renderPlaybackButton()}
        </View>
      </View>

      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <IconButton
            iconName="calendar"
            iconSize={20}
            iconColor="#FE89A9"
            onPress={showDatepicker}
            buttonText={diaryData.selectedDate.toDateString()}
          />
          {diaryData.showDatePicker && (
            <DateTimePicker
              value={diaryData.selectedDate}
              mode="date"
              onChange={onDateChange}
              color={styles.datePickerText}
            />
          )}
        </View>
        {renderQuestions()}
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        {diaryData.selectedImage && (
          <Image
            source={{ uri: diaryData.selectedImage }}
            style={styles.selectedImage}
          />
        )}
        <TouchableOpacity style={styles.saveButton} onPress={saveDiaryEntry}>
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 20,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000", // Black text color
  },
  datePickerText: {
    fontSize: 18,
    color: "#38B5FD",
    fontWeight: "800",
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
    color: "#000", // Black text color
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    paddingLeft: 8,
  },
  imageButton: {
    backgroundColor: "#AACFD0",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 8,
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: "#38B5FD",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#FFF", // White text color
    fontSize: 16,
  },
  buttonText: {
    color: "#FFF", // White text color
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    borderRadius: 8,
    paddingVertical: 8,
  },
});

export default DiaryScreen;
