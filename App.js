import React, { useState, useRef, useEffect } from "react";
import { StatusBar, Text, Animated, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileSettingsScreen from "./components/screens/settings/ProfileSettingsScreen";
import MentalHealthScreen from "./components/screens/MentalHealthScreen";
import GamesScreen from "./components/screens/GameScreen";
import DiaryScreen from "./components/screens/DiaryScreen";
import AuthStack from "./components/Auth/AuthStack";
import LoginScreen from "./components/screens/LoginScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ExpandedFlashcardScreen from "./components/screens/ExpandedFlashCard";
import FlashcardScreen from "./components/screens/FlashcardScreen";
import HomeScreen from "./components/screens/HomeScreen";

const Tab = createBottomTabNavigator();

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(false); // Set isAuthenticated to true upon successful login
  };

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainStack />
      ) : (
        <AuthStack handleLogin={handleLogin} /> 
      )}
    </NavigationContainer>
  );
};

export default App;

