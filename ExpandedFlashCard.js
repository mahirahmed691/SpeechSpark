import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  Share,
  Alert,
} from "react-native";
import * as Speech from "expo-speech";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/FontAwesome";

import ViewShot from "react-native-view-shot"; // Import the library
import styles from "./styles";
import Constants from "expo-constants";

const ExpandedFlashcardScreen = ({ route }) => {
  const { item } = route.params || {};
  const isIpad =
    Constants?.platform?.ios?.toLowerCase?.().includes?.("ipad") ?? false;

  const viewShotRef = useRef(null); 

  const [isMuted, setIsMuted] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(
    "com.apple.ttsbundle.Moira-compact"
  );

  const speakText = (text, rate = 1.0) => {
    if (!isMuted) {
      Speech.stop();
      Speech.speak(text, { voiceId: selectedVoice, rate });
    }
  };

  const speakTextWithDelay = () => {
    setTimeout(() => {
      speakText(item.title, speechRate);
    }, 1000);
  };

  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current.captureRef();
      const fileUri = `${FileSystem.cacheDirectory}flashcard_screenshot.jpg`;
      await FileSystem.copyAsync({ from: uri, to: fileUri });
      console.log("File Uri:", fileUri);
      await Sharing.shareAsync(fileUri, { mimeType: "image/jpeg" });
    } catch (error) {
      Alert.alert("Error", "Failed to share flashcard");
    }
  };
  

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSpeechRateChange = (value) => {
    setSpeechRate(value);
  };

  const handleVoiceChange = (value) => {
    setSelectedVoice(value);
  };

  return (
    <SafeAreaView style={styles.ExpandContainer}>
      <View style={styles.featureContainer}>
        <TouchableOpacity
          onPress={handleShare}
          style={styles.featureButton}
          activeOpacity={0.8}
        >
          <Icon name="share" size={20} color="white" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={[styles.featureButton, { marginRight: 10 }]}
            activeOpacity={0.8}
          >
            <Icon
              name={isFavorite ? "heart" : "heart-o"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleToggleMute}
            style={[styles.featureButton, { width: 40 }]}
            activeOpacity={0.8}
          >
            <Icon
              name={isMuted ? "volume-off" : "volume-up"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ViewShot
        ref={viewShotRef}
        style={{ flex: 1 }}
        options={{ format: "jpg", quality: 0.9 }}
      >
        <TouchableOpacity onPress={speakTextWithDelay}>
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.expandedFlashcardImage}
          >
            <View style={styles.imageOverlay}>
              <Text style={styles.expandedFlashcardTitle}>{item.title}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </ViewShot>
      <View>
        <View style={{ position: "absolute", top: 320, right: 10 }}>
          <Picker
            selectedValue={selectedVoice}
            onValueChange={handleVoiceChange}
            style={{ height: 50, width: 150, color: "pink" }}
          >
            <Picker.Item
              label="Voice 1"
              value="com.apple.ttsbundle.Moira-compact"
            />
            <Picker.Item label="Voice 2" value="your_custom_voice_id" />
          </Picker>
        </View>
      </View>
      <View style={styles.speechRateContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text style={styles.speechRateLabel}>Speech Rate</Text>
          <Text style={styles.speechRateValue}>{speechRate.toFixed(1)}</Text>
        </View>
        <View>
          <Slider
            style={styles.speechRateSlider}
            minimumValue={0.8}
            maximumValue={1.2}
            step={0.1}
            value={speechRate}
            onValueChange={handleSpeechRateChange}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExpandedFlashcardScreen;