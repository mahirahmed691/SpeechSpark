import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LogoPlaceholder from "../../assets/Logo.png";
import Flashcard from "../../utils/Flashcard";
import styles from "./styles";
import ThumbsUpDown from "../../utils/ThumbsUpDown";
import { timesOfDay, TimesOfDayTile, TimesOfDayList } from "../../utils/timeOfDayData";

const windowWidth = Dimensions.get("window").width;
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, animatedValue }) => {
  const [isThumbsUpSelected, setThumbsUpSelected] = useState(false);
  const [isThumbsDownSelected, setThumbsDownSelected] = useState(false);
  const [createTileModalVisible, setCreateTileModalVisible] = useState(false);
  const [newTileText, setNewTileText] = useState("");
  const [isListLayout, setListLayout] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleThumbsUp = () => {
    setThumbsUpSelected(!isThumbsUpSelected);
    if (isThumbsDownSelected) {
      setThumbsDownSelected(false);
    }
  };

  const handleThumbsDown = () => {
    setThumbsDownSelected(!isThumbsDownSelected);
    if (isThumbsUpSelected) {
      setThumbsUpSelected(false);
    }
  };

  const handleCreateTile = () => {
    setCreateTileModalVisible(true);
  };

  const handlePickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      console.log("Image picker result:", result);
      if (!result.cancelled) {
        setSelectedImage(result.uri);
        console.log("Selected image URI:", result.uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleConfirmCreateTile = () => {
    // Handle logic for creating a new tile with the provided text and image
    setCreateTileModalVisible(false);
    setNewTileText("");
    setSelectedImage(null);
  };

  const [searchText, setSearchText] = useState("");

  const getCurrentTimeOfDay = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 8) {
      return "😴"; // Early morning, still sleeping
    } else if (currentHour >= 8 && currentHour < 12) {
      return "🌅"; // Morning, wake-up time
    } else if (currentHour >= 12 && currentHour < 14) {
      return "🍔"; // Midday, lunchtime
    } else if (currentHour >= 14 && currentHour < 17) {
      return "📚"; // Afternoon, study or work time
    } else if (currentHour >= 17 && currentHour < 18) {
      return "🎮"; // Late afternoon, leisure time
    } else if (currentHour >= 18 && currentHour < 19) {
      return "🍽️"; // Evening, dinner time
    } else if (currentHour >= 19 && currentHour < 22) {
      return "📺"; // Evening, relaxation and entertainment
    } else {
      return "😴"; // Late night, bedtime
    }
  };

  const currentTimeOfDay = getCurrentTimeOfDay();
  const [currentTimes, setCurrentTimes] = useState("");
  const filteredTimesOfDay = timesOfDay.filter((time) =>
    time.text.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${formattedHours}:${formattedMinutes}`;
    };

    setCurrentTimes(getCurrentTime());

    const interval = setInterval(() => {
      setCurrentTimes(getCurrentTime());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Image
          source={LogoPlaceholder}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={{fontWeight:'900', alignSelf:'flex-end', fontFamily:'Futura', fontSize:20}}>Flashcards</Text>
        <Flashcard text={currentTimeOfDay} animatedValue={animatedValue} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          color="#000"
          placeholder="Search categories..."
          placeholderTextColor="#000"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
      <ScrollView>
        {!isListLayout ? (
          <FlatList
            data={filteredTimesOfDay}
            keyExtractor={(time) => time.id.toString()}
            renderItem={({ item }) => (
              <TimesOfDayList
                time={item}
                navigation={navigation}
                selected={item.text === currentTimeOfDay}
              />
            )}
          />
        ) : (
          <View style={styles.tilesContainer}>
            {filteredTimesOfDay.map((time) => (
              <TimesOfDayTile
                key={time.id}
                time={time}
                navigation={navigation}
                selected={time.text === currentTimeOfDay}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <StatusBar style="auto" />
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%", marginTop: 20 }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleCreateTile}
          >
            <Text style={styles.buttonText}>Create your own</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%" }}>
          <ThumbsUpDown
            onThumbsUp={handleThumbsUp}
            onThumbsDown={handleThumbsDown}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.toggleLayoutButton}
        onPress={() => setListLayout(!isListLayout)}
      >
        <Text style={styles.toggleLayoutButtonText}>
          {isListLayout ? "Switch to List 📋" : "Switch to Tile 🖼️"}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent
        animationType="slide"
        visible={createTileModalVisible}
        onRequestClose={() => setCreateTileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Your Own Tile</Text>
            <View style={styles.modalInputContainer}>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter tile name"
                onChangeText={(text) => setNewTileText(text)}
                value={newTileText}
                autoFocus 
              />
              <TouchableOpacity
                style={styles.uploadImageButton}
                onPress={handlePickImage}
              >
                <Text style={styles.uploadImageButtonText}>
                  Upload Picture +
                </Text>
              </TouchableOpacity>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleConfirmCreateTile}
              disabled={!newTileText.trim() || !selectedImage}
            >
              <Text style={styles.modalButtonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setCreateTileModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
