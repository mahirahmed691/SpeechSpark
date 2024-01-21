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
  Platform,
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
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import AuthStack from "./AuthStack";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Device } from "expo-device";

import styles from "./styles";
import ThumbsUpDown from "./ThumbsUpDown";

const windowWidth = Dimensions.get("window").width;

const FlashcardScreen = ({ route, navigation }) => {
  const { params } = route;

  const isIpad = Platform.OS === "ios" && Platform.isPad;

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
    Constants?.platform?.ios?.toLowerCase?.().includes?.("ipad") ?? false;
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
          height: 80,
        },
      ]}
    >
      <FontAwesome5 name={time.icon} size={15} color="#fff" />
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
          width: "92%",
          alignSelf: "center",
          height: 70,
          flexDirection: "row",
          justifyContent: "space-around",
        },
      ]}
    >
      <FontAwesome5 name={time.icon} size={22} color="#fff" />
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
    width: 150,
    paddingLeft: 70,
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

  const timesOfDayColors = {
    morningRoutine: "#AACFD0", // Soft Blue-Green
    lunchtime: "#AACFD0", // Soft Blue-Green
    afternoonNap: "#AACFD0", // Soft Blue-Green
    playtime: "#FFB6C1", // Light Pink
    studyTime: "#FFB6C1", // Light Pink
    dinner: "#FFB6C1", // Light Pink
    eveningRelaxation: "#AACFD0", // Soft Blue-Green
    gameNight: "#AACFD0", // Soft Blue-Green
    bedtimeStories: "#AACFD0", // Soft Blue-Green
    restaurant: "#FFB6C1", // Light Pink
    carTime: "#FFB6C1", // Light Pink
    goingOut: "#FFB6C1", // Light Pink
    holiday: "#AACFD0", // Soft Blue-Green
    phrases: "#AACFD0", // Soft Blue-Green
    bathTime: "#AACFD0", // Soft Blue-Green
  };

  const timesOfDay = [
    {
      id: 1,
      text: "Morning \nRoutine",
      icon: "sun",
      backgroundColor: timesOfDayColors.morningRoutine,
    },
    {
      id: 2,
      text: "Lunchtime",
      icon: "utensils",
      backgroundColor: timesOfDayColors.lunchtime,
    },
    {
      id: 3,
      text: "Afternoon \nNap",
      icon: "bed",
      backgroundColor: timesOfDayColors.afternoonNap,
    },
    {
      id: 4,
      text: "Playtime",
      icon: "gamepad",
      backgroundColor: timesOfDayColors.playtime,
    },
    {
      id: 5,
      text: "Study Time",
      icon: "book",
      backgroundColor: timesOfDayColors.studyTime,
    },
    {
      id: 6,
      text: "Dinner",
      icon: "utensils",
      backgroundColor: timesOfDayColors.dinner,
    },
    {
      id: 7,
      text: "Evening \nRelaxation",
      icon: "bed",
      backgroundColor: timesOfDayColors.eveningRelaxation,
    },
    {
      id: 8,
      text: "Game Night",
      icon: "gamepad",
      backgroundColor: timesOfDayColors.gameNight,
    },
    {
      id: 9,
      text: "Bedtime \n Stories",
      icon: "book",
      backgroundColor: timesOfDayColors.bedtimeStories,
    },
    {
      id: 10,
      text: "Restaurant",
      icon: "table",
      backgroundColor: timesOfDayColors.restaurant,
    },
    {
      id: 11,
      text: "Car Time",
      icon: "car",
      backgroundColor: timesOfDayColors.carTime,
    },
    {
      id: 12,
      text: "Going out",
      icon: "tree",
      backgroundColor: timesOfDayColors.goingOut,
    },
    {
      id: 13,
      text: "Holiday",
      icon: "plane",
      backgroundColor: timesOfDayColors.holiday,
    },
    {
      id: 14,
      text: "Phrases",
      icon: "sms",
      backgroundColor: timesOfDayColors.phrases,
    },
    {
      id: 15,
      text: "Bath time",
      icon: "bath",
      backgroundColor: timesOfDayColors.bathTime,
    },
  ];

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
          backgroundColor: "#FFF",
          justifyContent: "space-around",
          marginVertical: "middle",
          flexDirection: "row",
          margin: 0,
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
            paddingTop: 8,
            width: "33%",
            height: 80,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              color: "#AACFD0",
              marginLeft: 30,
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
          color="#FFF"
          placeholder="Search categories..."
          placeholderTextColor="white"
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
