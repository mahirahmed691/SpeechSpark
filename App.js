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
import * as Speech from 'expo-speech';
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
import AuthStack from "./AuthStack";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

    const speakText = (text) => {
    Speech.stop();
    const voiceId = 'com.apple.ttsbundle.Moira-compact';
    Speech.speak(text, { voiceId });
  };

    const speakTextWithDelay = () => {
      // Add a delay of 5 seconds before triggering the text-to-speech
      setTimeout(() => {
        speakText(item.title);
      }, 5000); // 5000 milliseconds = 5 seconds
    };

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
    </SafeAreaView>
  );
};

const Tab = createBottomTabNavigator();

const TimesOfDayTile = ({ time, navigation, selected, style }) => {
  return (
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
            borderRadius: 20,
            fontWeight:"700",
          },
        ]}
      >
        {time.imagePlaceholder && (
          <Image
            source={{ uri: time.imagePlaceholder }}
            style={styles.imageTile}
          />
        )}
      </View>
      <Text style={styles.tileText} numberOfLines={2}>
        {time.text}
      </Text>
    </TouchableOpacity>
  );
};

const TimesOfDayList = ({ time, navigation, selected, style }) => {
  return (
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
            width: "90%",
            alignSelf:'center',
            height: 30,
            flexDirection: "row",
            paddingLeft:20
          },
        ]}
      >
        {time.imagePlaceholder && (
          <FontAwesome5 name={time.icon} size={14} color="#fff" />
        )}
        <Text style={styles.listText} numberOfLines={2}>
          {time.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

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
    marginLeft:100,
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
    morningRoutine: "#AACFD0",
    lunchtime: "#AACFD0",
    afternoonNap: "#AACFD0",
    playtime: "#FFB6C1",
    studyTime: "#FFB6C1",
    dinner: "#FFB6C1",
    eveningRelaxation: "#AACFD0",
    bedtimeStories: "#AACFD0",
    restaurant: "#FFB6C1",
    carTime: "#FFB6C1",
    goingOut: "#FFB6C1",
    holiday: "#AACFD0",
    phrases: "#AACFD0",
    bathTime: "#AACFD0",
  };

  const timesOfDay = [
    {
      id: 1,
      text: "Breakfast",
      icon: "sun",
      backgroundColor: timesOfDayColors.morningRoutine,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/10562/screenshots/14185674/media/5e251a2a4ea610186ff094f92f6af231.jpg?resize=1600x1200&vertical=center",
    },
    {
      id: 2,
      text: "Lunchtime",
      icon: "utensils",
      backgroundColor: timesOfDayColors.lunchtime,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/1335467/screenshots/3059003/media/234b9b1d7f7cae330fa8dd6df8f40c9f.png?resize=400x300&vertical=center",
    },
    {
      id: 3,
      text: "Nap time",
      icon: "bed",
      backgroundColor: timesOfDayColors.afternoonNap,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/730703/screenshots/4318271/media/a50dc3483fbd88f311a0b4a2daa3622b.jpg?resize=800x600&vertical=center",
    },
    {
      id: 4,
      text: "Playtime",
      icon: "gamepad",
      backgroundColor: timesOfDayColors.playtime,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/141092/screenshots/3459816/media/5bfe05da84fdffeb4f243088dae30604.jpg?resize=800x600&vertical=center",
    },
    {
      id: 5,
      text: "Study",
      icon: "book",
      backgroundColor: timesOfDayColors.studyTime,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/1652983/screenshots/4100705/__w.png?resize=800x600&vertical=center",
    },
    {
      id: 6,
      text: "Dinner",
      icon: "utensils",
      backgroundColor: timesOfDayColors.dinner,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/1320478/screenshots/18128534/media/ab50d073ac9b5bc52db3d7586fed1183.jpg?resize=1600x1200&vertical=center",
    },
    {
      id: 7,
      text: "Relax",
      icon: "bed",
      backgroundColor: timesOfDayColors.eveningRelaxation,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/14765/screenshots/623634/media/384458dae230ea1c223dee520cec60aa.png?resize=400x300&vertical=center",
    },
    {
      id: 8,
      text: "Game Night",
      icon: "gamepad",
      backgroundColor: timesOfDayColors.gameNight,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/18463/screenshots/4482340/2018-gamenight-sm.png?resize=800x600&vertical=center",
    },
    {
      id: 9,
      text: "Bedtime",
      icon: "book",
      backgroundColor: timesOfDayColors.bedtimeStories,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/64261/screenshots/314636/bedtime_bbb72.png?resize=400x300&vertical=center",
    },
    {
      id: 10,
      text: "Restaurant",
      icon: "table",
      backgroundColor: timesOfDayColors.restaurant,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/1199246/screenshots/4231374/media/37858d6f84c2586b128cfdc157c05251.png?resize=800x600&vertical=center",
    },
    {
      id: 11,
      text: "Journey",
      icon: "car",
      backgroundColor: timesOfDayColors.carTime,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/2939235/screenshots/14906891/media/a831206f10b659b6c39b00da20af4acf.jpg?resize=1600x1200&vertical=center",
    },
    {
      id: 12,
      text: "Going out",
      icon: "tree",
      backgroundColor: timesOfDayColors.goingOut,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/319371/screenshots/3131142/media/1818cac84410fd7f009eb4dc18d28e83.gif",
    },
    {
      id: 13,
      text: "Holiday",
      icon: "plane",
      backgroundColor: timesOfDayColors.holiday,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/776185/screenshots/2404558/media/dbfd726e40cac8754e9eccd22bbede0b.gif",
    },
    {
      id: 14,
      text: "Phrases",
      icon: "sms",
      backgroundColor: timesOfDayColors.phrases,
      imagePlaceholder:
        "https://cdn.dribbble.com/users/3863246/screenshots/16276147/dribb104sm.png?resize=700x525&vertical=center",
    },
    {
      id: 15,
      text: "Bath time",
      icon: "bath",
      backgroundColor: timesOfDayColors.bathTime,
      imagePlaceholder:
        "https://cdn.dribbble.com/userupload/12275151/file/original-ca12664ff2a493a41072810d72f27620.gif",
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

      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${formattedHours}:${formattedMinutes}`;
    };

    // Set the initial time
    setCurrentTimes(getCurrentTime());

    // Update the time every minute
    const interval = setInterval(() => {
      setCurrentTimes(getCurrentTime());
    }, 60 * 1000); // Update every 60 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#FFF",
          justifyContent:'space-around',
          flexDirection: "row",
          paddingVertical:20,
          marginBottom: 10,
          padding:20,

        }}
      >
        <Image
          source={LogoPlaceholder}
          style={styles.logo}
          resizeMode="contain"
        />
        <View
          style={{
            width:'33%',
            backgroundColor:'#F0f0F0',
            height:70,
            width:70,
            justifyContent:'center',
            borderRadius:100,
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
              fontFamily:'serif',
              letterSpacing:2.5,
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
