import React, { useState, useRef, useEffect } from "react";
import {
  StatusBar,
  TouchableOpacity,
  Modal,
  Text,
  View,
  Image,
  SafeAreaView,
  Animated,
  FlatList,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LogoPlaceholder from "./assets/Logo.png";
import ProfileSettingsScreen from "./ProfileSettingsScreen";
import MentalHealthScreen from "./MentalHealthScreen";
import GamesScreen from "./GameScreen";
import DiaryScreen from "./DiaryScreen";
import AuthStack from "./AuthStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ExpandedFlashcardScreen from "./ExpandedFlashCard";
import FlashcardScreen from "./FlashcardScreen";
import {
  timesOfDayColors,
  timesOfDay,
  TimesOfDayList,
  TimesOfDayTile,
} from "./utils/timeOfDayData";

import styles from "./styles";
import ThumbsUpDown from "./ThumbsUpDown";

const windowWidth = Dimensions.get("window").width;
const Tab = createBottomTabNavigator();

const Flashcard = ({ text, animatedValue }) => {
  const animatedStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 3],
          outputRange: [0.7, 1],
        }),
      },
    ],
    width: "33%",
    marginTop: 10,
    alignItems: "center",
    marginLeft: 100,
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Text style={styles.dateText}>{text}</Text>
    </Animated.View>
  );
};

const HomeScreen = ({ navigation, animatedValue }) => {
  const [isThumbsUpSelected, setThumbsUpSelected] = useState(false);
  const [isThumbsDownSelected, setThumbsDownSelected] = useState(false);
  const [createTileModalVisible, setCreateTileModalVisible] = useState(false);
  const [newTileText, setNewTileText] = useState("");
  const [isListLayout, setListLayout] = useState(true); 

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

  const handleConfirmCreateTile = () => {
    analytics().logEvent("custom_tile_created", {
      tileName: newTileText,
    });
    setCreateTileModalVisible(false);
    setNewTileText("");
  };

  const [searchText, setSearchText] = useState("");

  const getCurrentTimeOfDay = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 8 && currentHour < 9) {
      return "🌅";
    } else if (currentHour >= 9 && currentHour < 12) {
      return "☀️";
    } else if (currentHour >= 12 && currentHour < 1) {
      return "🕛";
    } else if (currentHour >= 1 && currentHour < 14) {
      return "🍔";
    } else if (currentHour >= 14 && currentHour < 15) {
      return "🎮";
    } else if (currentHour >= 16 && currentHour < 17) {
      return "📚";
    } else if (currentHour >= 18 && currentHour < 19) {
      return "🍽️";
    } else if (currentHour >= 20 || (currentHour >= 0 && currentHour < 6)) {
      return "😴";
    } else {
      return "🆓";
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
          backgroundColor: "#FFF",
          justifyContent: "space-around",
          flexDirection: "row",
          paddingVertical: 20,
          marginBottom: 10,
          padding: 20,
        }}
      >
        <Image
          source={LogoPlaceholder}
          style={styles.logo}
          resizeMode="contain"
        />
        <View
          style={{
            width: "33%",
            backgroundColor: "#F0f0F0",
            height: 70,
            width: 70,
            justifyContent: "center",
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              textAlign: "center",
              color: "#000",
              height: 40,
              width: 80,
              fontWeight: "900",
              lineHeight: 50,
              alignSelf: "center",
              fontFamily: "serif",
              letterSpacing: 2.5,
            }}
          >
            {currentTimes}
          </Text>
        </View>
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
                style={{ justifyContent: "flex-start", width: "33%" }}
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

const MainStack = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Deck") {
              iconName = focused ? "cards" : "cards-outline";
            } else if (route.name === "Flashcard") {
              iconName = focused ? "flash" : "flash-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline";
            } else if (route.name === "Diary") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Games") {
              iconName = focused
                ? "gamepad-variant"
                : "gamepad-variant-outline";
            } else if (route.name === "Health") {
              iconName = focused ? "brain" : "brain";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#A6E1E4",
          inactiveTintColor: "#38B5FD",
        }}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} animatedValue={animatedValue} />}
        </Tab.Screen>
        <Tab.Screen name="Deck" component={FlashcardScreen} />
        <Tab.Screen name="Flashcard" component={ExpandedFlashcardScreen} />
        <Tab.Screen name="Diary" component={DiaryScreen} />
        <Tab.Screen name="Health" component={MentalHealthScreen} />
        <Tab.Screen name="Games" component={GamesScreen} />
        <Tab.Screen name="Settings" component={ProfileSettingsScreen} />
      </Tab.Navigator>
    </>
  );
};

const App = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const isAuthenticated = false; // Replace with your authentication logic

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <MainStack /> : <AuthStack />} */}
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
