import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { TextInput } from "react-native-paper";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import * as Location from "expo-location";
import axios from "axios";

const DiaryScreen = () => {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [isRecording, setIsRecording] = useState(false);
  
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
      text: "Did you achieve your goals for the day?",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      id: 4,
      text: "What is one thing you learned today?",
      type: "text",
    },
  ];

  const [diaryData, setDiaryData] = useState({
    selectedDate: new Date(),
    isPlaying: false,
    questions: exampleQuestions,
    responses: [],
    showDatePicker: false,
    location: null,
    city: "",
  });


  useEffect(() => {
    if (diaryData.location) {
      convertLocationToCity();
    }
  }, [diaryData.location]);

  const handleResponseChange = (index, response) => {
    const newResponses = [...diaryData.responses];
    newResponses[index] = response;
    setDiaryData({ ...diaryData, responses: newResponses });
  };

  useEffect(() => {
    // Function to get location automatically
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need location permissions to make this work!");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setDiaryData({ ...diaryData, location });

        // Convert location to city
        convertLocationToCity(
          location.coords.latitude,
          location.coords.longitude
        );
      } catch (error) {
        console.error("Error getting location", error);
      }
    };

    // Call the function to get location when the component mounts
    getLocation();
  }, []);

  const renderQuestions = () => {
    return diaryData.questions.map((question, index) => {
      const renderQuestionType = () => {
        switch (question.type) {
          case "text":
            return (
              <TextInput
                style={styles.textInput}
                placeholder="Type your response here"
                value={diaryData.responses[index]}
                onChangeText={(value) => handleResponseChange(index, value)}
              />
            );
          case "radio":
            return (
              <CheckBox
                title={`Selected Value: ${
                  diaryData.responses[index]?.value ? "Yes" : "No"
                }`}
                checked={diaryData.responses[index]?.value}
                onPress={() =>
                  handleResponseChange(index, {
                    value: !diaryData.responses[index]?.value,
                  })
                }
              />
            );
          case "slider":
            return (
              <View>
                <Text style={styles.sliderValue}>
                  Selected Value: {diaryData.responses[index]?.value || 5}
                </Text>
                <Slider
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={diaryData.responses[index]?.value || 5}
                  onValueChange={(value) =>
                    handleResponseChange(index, { value })
                  }
                />
              </View>
            );
          default:
            return null;
        }
      };

      return (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.text}</Text>
          {renderQuestionType()}
        </View>
      );
    });
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
        alert("Sorry, we need audio recording permissions to make this work!");
        return;
      }
  
      // Set audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
  
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
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
        setRecording(null);
        setIsRecording(false);
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
    if (isRecording) {
      return (
        <TouchableOpacity style={styles.buttonContainer} onPress={stopRecording}>
          <Icon name="stop" size={20} color="#FE89A9" style={styles.icon} />
          <Text style={styles.buttonText}>Stop Recording</Text>
        </TouchableOpacity>
      );
    } else if (diaryData.isPlaying) {
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
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Icon
            name={isRecording ? "stop" : "microphone"}
            iconColor="#fff"
            iconSize={20}
          />
        </TouchableOpacity>
      );
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

      // Convert location to city
      convertLocationToCity(
        location.coords.latitude,
        location.coords.longitude
      );
    } catch (error) {
      console.error("Error capturing location", error);
    }
  };

  const convertLocationToCity = async (latitude, longitude) => {
    const apiKey = "e0b0f59d76ea4bdb847dc83c9c1f6d06"; // Replace with your OpenCage API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

    try {
      const response = await axios.get(apiUrl);
      const city = response.data.results[0].components.city;
      setDiaryData({ ...diaryData, city });
    } catch (error) {
      console.error(
        "Error converting location to city",
        error.response?.data || error.message
      );
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#F0F0F0",
          marginBottom: 20,
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "column", width: "80%" }}>
          <Text style={styles.headerText}>E-Diary</Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: -15,
              justifyContent: "space-between",
            }}
          >
            <IconButton
              iconName="calendar"
              iconSize={20}
              iconColor="#FE89A9"
              onPress={showDatepicker}
              buttonText={diaryData.selectedDate.toDateString()}
            />
          </View>
          <View>
            {diaryData.showDatePicker && (
              <DateTimePicker
                value={diaryData.selectedDate}
                mode="date"
                onChange={onDateChange}
                color={styles.datePickerText}
                style={{ marginRight: 20, alignSelf: "center" }}
              />
            )}
          </View>
        </View>

        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            {diaryData.location && (
              <Text style={styles.locationText}>
                Location
                {`${diaryData.location.coords.latitude.toFixed(
                  2
                )}, ${diaryData.location.coords.longitude.toFixed(2)}`}
              </Text>
            )}
            <IconButton
              iconName="map-marker"
              iconSize={20}
              iconColor="#37B7FD"
              onPress={captureLocation}
            />
            <Text
              style={{
                position: "absolute",
                right: 50,
                top: 8,
                fontWeight: "900",
                fontSize: 15,
              }}
            >
              {diaryData.city}
            </Text>
          </View>

          {renderPlaybackButton()}
        </View>
      </View>

      <ScrollView style={{ backgroundColor: "#FFF" }}>
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
    backgroundColor: "#FFF",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
    marginTop: 10,
    letterSpacing: 12,
    textDecorationColor: "pink",
  },
  datePickerText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "800",
  },
  locationText: {
    fontSize: 16,
    color: "#000",
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
    color: "#000",
    marginLeft: 10,
  },
  textInput: {
    marginTop: 8,
    paddingLeft: 8,
    backgroundColor: "#FFF",
    marginLeft: -10,
  },
  imageButton: {
    backgroundColor: "#AACFD0",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
    width: "95%",
    alignSelf: "center",
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
    width: "95%",
    alignSelf: "center",
    marginBottom: 40,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    padding: 10,
    borderRadius: 8,
    paddingVertical: 8,
  },
  slider: {
    marginLeft: 10,
  },
});

export default DiaryScreen;
