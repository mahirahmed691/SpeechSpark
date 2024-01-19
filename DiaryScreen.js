import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";

const DiaryScreen = () => {
  const [questions, setQuestions] = useState([
    { question: "How was your day?", type: "text" },
    { question: "What made you happy today?", type: "text" },
    { question: "Any challenges you faced?", type: "text" },
    {
      question: "How do you feel today?",
      type: "radio",
      options: [
        { label: "😄", value: "Happy" },
        { label: "😢", value: "Sad" },
        { label: "😐", value: "Neutral" },
        { label: "😠", value: "Angry" },
      ],
    },
  ]);

  const [responses, setResponses] = useState(Array(questions.length).fill(""));
  const [radioResponses, setRadioResponses] = useState(
    Array(questions.length).fill(null)
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleResponseChange = (index, response) => {
    const newResponses = [...responses];
    newResponses[index] = response;
    setResponses(newResponses);
  };

  const handleRadioResponseChange = (index, response) => {
    const newRadioResponses = [...radioResponses];
    newRadioResponses[index] = response;
    setRadioResponses(newRadioResponses);
  };

  const renderQuestions = () => {
    return questions.map((question, index) => (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        {question.type === "text" ? (
          <TextInput
            style={styles.responseInput}
            value={responses[index]}
            onChangeText={(text) => handleResponseChange(index, text)}
            placeholder="Type your response here"
            multiline
          />
        ) : question.type === "radio" ? (
          <RadioGroup
            radioButtons={question.options}
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
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>{buttonText}</Text>
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
      setSelectedImage(result.uri);
    }
  };

  const saveDiaryEntry = () => {
    console.log("Date:", selectedDate.toISOString());
    console.log("Text Responses:", responses);
    console.log("Radio Responses:", radioResponses);
    console.log("Selected Image:", selectedImage);
    console.log("Audio URI:", audioUri);
    console.log("Location:", location);
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.headerText}>My Digital Diary</Text>
        <IconButton iconName="microphone" iconColor="orange" iconSize={22} />
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <IconButton iconName="calendar" iconSize={24} iconColor="#FE89A9" />
          {Platform.OS === "ios" && (
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={styles.datePickerText}>
                {selectedDate.toDateString()}
              </Text>
            </TouchableOpacity>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
        {renderQuestions()}
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    color: "black",
  },
  datePickerText: {
    fontSize: 18,
    marginBottom: 8,
    color: "#FE89A9",
    fontWeight: "900",
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  responseInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
    padding: 8,
    height: 100,
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
  audioButton: {
    backgroundColor: "#FF89A9",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  audioUriText: {
    fontSize: 14,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: "#38B5FD",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DiaryScreen;
