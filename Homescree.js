// HomeScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Animated, { Easing } from "react-native-reanimated";
import { Flashcard } from "./Flashcard";
import { ThumbsUpDown } from "./ThumbsUpDown";
import { TimesOfDayTile } from "./TimesOfDayTile";
import { styles } from "./Styles";

const HomeScreen = ({ navigation, animatedValue }) => {
  const [isThumbsUpSelected, setThumbsUpSelected] = useState(false);
  const [isThumbsDownSelected, setThumbsDownSelected] = useState(false);
  const [createTileModalVisible, setCreateTileModalVisible] = useState(false);
  const [newTileText, setNewTileText] = useState("");

  // ... (rest of the code remains the same)

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.BACKGROUND,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Image
          source={LogoPlaceholder}
          style={styles.logo}
          resizeMode="contain"
        />
        <Flashcard
          text={`Current Activity ${currentTimeOfDay}`}
          animatedValue={animatedValue}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories..."
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
      <ScrollView>
        <View style={styles.tilesContainer}>
          {filteredTimesOfDay.map((time) => (
            <TimesOfDayTile
              key={time.id}
              time={time}
              navigation={navigation}
              selected={time.text === currentTimeOfDay}
              style={{ justifyContent: "flex-start" }}
            />
          ))}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%", marginBottom: 15, marginTop: 20 }}>
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
      <Modal
        transparent
        animationType="slide"
        visible={createTileModalVisible}
        onRequestClose={() => setCreateTileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Your Own Tile</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter tile name"
              onChangeText={(text) => setNewTileText(text)}
              value={newTileText}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleConfirmCreateTile}
            >
              <Text style={styles.modalButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export { HomeScreen };
