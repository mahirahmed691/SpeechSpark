import React, { useRef } from "react";
import { StatusBar, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import FlashcardScreen from "../screens/FlashcardScreen";
import ExpandedFlashcardScreen from "../screens/ExpandedFlashCard";
import DiaryScreen from "../screens/DiaryScreen";
import MentalHealthScreen from "../screens/MentalHealthScreen";
import GamesScreen from "../screens/GameScreen";
import ProfileSettingsScreen from "../screens/settings/ProfileSettingsScreen";

const Tab = createBottomTabNavigator();

const MainStack = ({ handleLogout }) => {
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
              <MaterialCommunityIcons name={iconName} size={25} color={color} />
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
        <Tab.Screen
          name="Settings"
          component={ProfileSettingsScreen}
          initialParams={{ handleLogout: handleLogout }} // Pass handleLogout as a parameter
        />
      </Tab.Navigator>
    </>
  );
};

export default MainStack;