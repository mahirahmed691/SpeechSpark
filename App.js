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
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ImageBackground } from "react-native";
import { flashcardsData } from "./flashcardData";
import LogoPlaceholder from "./assets/Logo.png";
import ProfileSettingsScreen from "./ProfileSettingsScreen";
import MentalHealthScreen from "./MentalHealthScreen";
import GamesScreen from "./GameScreen";
import DiaryScreen from "./DiaryScreen";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";
import ThumbsUpDown from "./ThumbsUpDown";

const windowWidth = Dimensions.get("window").width;

const FlashcardScreen = ({ route, navigation }) => {
  const isIpad =
    Constants.platform?.ios?.model?.toLowerCase?.().includes?.("ipad") ?? false;
  const { params } = route;

  if (!params || !params.title || !flashcardsData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: isIpad ? 300 : 200 }}>
          <Image
            source={{
              uri: "https://cdn.dribbble.com/userupload/4156800/file/original-4ddbc7d8125bd5b293c122ab1f1ddcbc.png?resize=1504x1272",
            }}
            style={styles.image}
          />
          <Text style={styles.NoCardText}>No Deck Selected</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { title, onAddTile } = params;
  const flashcards = flashcardsData[title] || [];

  if (!flashcards) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.cardText}>
          No flashcards available for this deck
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.cardText}>{`Flashcards for ${title}`}</Text>
      <FlatList
        data={flashcards}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Flashcard", { item });
            }}
          >
            <View style={styles.visualFlashcard}>
              <Image
                source={{ uri: item?.image }}
                style={styles.visualFlashcardImage}
              />
              <Text style={styles.visualFlashcardTitle}>{item?.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
};

const ExpandedFlashcardScreen = ({ route }) => {
  const { item } = route.params || {};

  const isIpad =
    Constants.platform?.ios?.model?.toLowerCase?.().includes?.("ipad") ?? false;
  if (!item) {
    return (
      <SafeAreaView style={styles.ExpandContainer}>
        <View style={{ marginTop: isIpad ? 300 : 200 }}>
          <Image
            source={{
              uri: "https://cdn.dribbble.com/users/1040983/screenshots/4870530/media/a6ad9466ae81789d22439d56a31dafd2.png?resize=800x600&vertical=center",
            }}
            style={styles.image}
          />
          <Text style={styles.NoCardText}>No Flashcard Selected</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.ExpandContainer}>
      <Text style={styles.expandedFlashcardTitle}>{item.title}</Text>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.expandedFlashcardImage}
      ></ImageBackground>
    </SafeAreaView>
  );
};

const Tab = createBottomTabNavigator();

const TimesOfDayTile = ({ time, navigation, selected, style }) => (
  <TouchableOpacity
    onPress={() => {
      if (navigation) {
        navigation.navigate("Deck", { title: time.text });
      } else {
        console.warn("Navigation prop is not available");
      }
    }}
  >
    <View
      style={[
        styles.tile,
        {
          backgroundColor: selected ? "#FF6347" : time.backgroundColor,
          width: 120,
        },
      ]}
    >
      <FontAwesome5 name={time.icon} size={24} color="#fff" />
      <Text style={styles.tileText} numberOfLines={2}>
        {time.text}
      </Text>
    </View>
  </TouchableOpacity>
);

const TimesOfDayList = ({ time, navigation, selected, style }) => (
  <TouchableOpacity
    onPress={() => {
      if (navigation) {
        navigation.navigate("Deck", { title: time.text });
      } else {
        console.warn("Navigation prop is not available");
      }
    }}
  >
    <View
      style={[
        styles.tile,
        {
          backgroundColor: selected ? "#FF6347" : time.backgroundColor,
          width: "100%",
          height: 65,
          flexDirection: "row", justifyContent: "space-around"
        },
      ]}
    >

        <FontAwesome5 name={time.icon} size={20} color="#fff" />
        <Text style={styles.listText} numberOfLines={2}>
          {time.text}
        </Text>
    </View>
  </TouchableOpacity>
);

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
    backgroundColor: "#72B7EE",
    width: 150,
    paddingLeft: 30,
    alignItems: "center",
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
  const [isListLayout, setListLayout] = useState(true); // New state for layout type

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

  const [timesOfDay, setTimesOfDay] = useState([
    {
      id: 1,
      text: "Morning \nRoutine",
      icon: "sun",
      backgroundColor: "#72B7EE",
    },
    { id: 2, text: "Lunchtime", icon: "utensils", backgroundColor: "#72B7EE" },
    {
      id: 3,
      text: "Afternoon \nNap",
      icon: "bed",
      backgroundColor: "#72B7EE",
    },
    { id: 4, text: "Playtime", icon: "gamepad", backgroundColor: "#FE89A9" },
    { id: 5, text: "Study Time", icon: "book", backgroundColor: "#FE89A9" },
    {
      id: 6,
      text: "Dinner",
      icon: "utensils",
      backgroundColor: "#FE89A9",
    },
    {
      id: 7,
      text: "Evening\nRelaxation",
      icon: "bed",
      backgroundColor: "#72B7EE",
    },
    { id: 8, text: "Game Night", icon: "gamepad", backgroundColor: "#72B7EE" },
    {
      id: 9,
      text: "Bedtime \n Stories",
      icon: "book",
      backgroundColor: "#72B7EE",
    },
    { id: 10, text: "Restaurant", icon: "table", backgroundColor: "#FE89A9" },
    { id: 11, text: "Car Time", icon: "car", backgroundColor: "#FE89A9" },
    { id: 12, text: "Going out", icon: "tree", backgroundColor: "#FE89A9" },
    { id: 13, text: "Holiday", icon: "plane", backgroundColor: "#72B7EE" },
    { id: 14, text: "Phrases", icon: "sms", backgroundColor: "#72B7EE" },
    { id: 15, text: "Bath time", icon: "bath", backgroundColor: "#72B7EE" },
  ]);

  const [searchText, setSearchText] = useState("");

  const getCurrentTimeOfDay = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 7 && currentHour < 9) {
      return "Morning Routine";
    } else if (currentHour >= 12 && currentHour < 14) {
      return "Lunchtime";
    } else if (currentHour >= 14 && currentHour < 15) {
      return "Afternoon Nap";
    } else if (currentHour >= 14 && currentHour < 15) {
      return "Playtime";
    } else if (currentHour >= 16 && currentHour < 17) {
      return "Study Time";
    } else if (currentHour >= 18 && currentHour < 19) {
      return "Dinner";
    } else if (currentHour >= 20 || (currentHour >= 0 && currentHour < 6)) {
      return "Bedtime";
    } else {
      return "FreeTime";
    }
  };

  const currentTimeOfDay = getCurrentTimeOfDay();
  const currentTime = new Date().toLocaleTimeString();
  const [currentTimes, setCurrentTimes] = useState("");

  // Filter times based on search input
  const filteredTimesOfDay = timesOfDay.filter((time) =>
    time.text.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    // Function to get the current time
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

      return `${formattedHours}:${
        minutes < 10 ? `0${minutes}` : minutes
      } ${ampm}`;
    };

    // Set the initial time
    setCurrentTimes(getCurrentTime());

    // Update the time every minute
    const interval = setInterval(() => {
      setCurrentTimes(getCurrentTime());
    }, 60000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#F0f0f0",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <Image
          source={LogoPlaceholder}
          style={styles.logo}
          resizeMode="contain"
        />
        <View
          style={{
            alignSelf: "center",
            paddingTop: 28,
            width: "33%",
            height: 80,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {currentTime}
          </Text>
        </View>
        <Flashcard text={currentTimeOfDay} animatedValue={animatedValue} />
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
                style={{ justifyContent: "flex-start", width: "33%" }} // Keep existing style for tile layout
              />
            ))}
          </View>
        )}
      </ScrollView>

      <StatusBar style="auto" />
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%", marginBottom: -20, marginTop: 20 }}>
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
          {isListLayout ? "Switch to List" : "Switch to Tile"}
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

const App = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <NavigationContainer>
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
            } else if (route.name === "Profile") {
              iconName = focused ? "cog" : "cog-outline";
            } else if (route.name === "Diary") {
              iconName = focused ? "book" : "book-outline";
            }
            if (route.name === "Games") {
              iconName = focused
                ? "gamepad-variant"
                : "gamepad-variant-outline";
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
          inactiveTintColor: "#FE89A9",
        }}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} animatedValue={animatedValue} />}
        </Tab.Screen>
        <Tab.Screen name="Deck" component={FlashcardScreen} />
        <Tab.Screen
          name="Flashcard"
          component={ExpandedFlashcardScreen}
          options={{ tabBarVisible: false }}
        />
        <Tab.Screen name="Diary" component={DiaryScreen} />
        <Tab.Screen name="Games" component={GamesScreen} />

        <Tab.Screen
          name="MentalHealth"
          component={MentalHealthScreen} // Make sure to create this component
          options={{
            tabBarLabel: "Health",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="brain" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileSettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
