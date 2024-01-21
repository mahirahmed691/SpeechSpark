// ProfileSettingsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PrivacySettingsScreen from "./PrivacySettingsScreen";
import AccountSettingsScreen from "./AccountSettingsScreen";
import NotificationSettingsScreen from "./NotificationSettingsScreen";
import LanguageSettingsScreen from "./LanguageSettingsScreen";
import ThemeSettingsScreen from "./ThemeSettingsScreen";
import SecuritySettingsScreen from "./SecuritySettingsScreen";
import DeleteAccountModal from "./DeleteAccountModal"; // Import the new component
import styles from "./styles";
import LogoPlaceholder from "./assets/Logo.png";

const Stack = createStackNavigator();

const ProfileSettingsScreen = () => {
  const navigation = useNavigation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    setDeleteModalVisible(false);
  };

  const iconColor="#38B5FD"

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={LogoPlaceholder}
          style={styles.profileLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Profile Settings</Text>
      </View>
      <ScrollView style={styles.settingsContainer}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen("AccountSettings")}
        >
          <MaterialCommunityIcons name="account" size={24} color={iconColor} />
          <Text style={styles.settingText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen("NotificationSettings")}
        >
          <MaterialCommunityIcons name="bell" size={24} color={iconColor} />
          <Text style={styles.settingText}>Notification Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen("PrivacySettings")}
        >
          <MaterialCommunityIcons name="lock" size={24} color={iconColor} />
          <Text style={styles.settingText}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen("LanguageSettings")}
        >
          <MaterialCommunityIcons
            name="language-lua"
            size={24}
            color={iconColor}
          />
          <Text style={styles.settingText}>Language Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen("ThemeSettings")}
        >
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color={iconColor}
          />
          <Text style={styles.settingText}>Theme Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigateToScreen("SecuritySettings")}
        >
          <MaterialCommunityIcons
            name="shield-account"
            size={24}
            color={iconColor}
          />
          <Text style={styles.settingText}>Security Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={showDeleteModal}>
          <MaterialCommunityIcons name="delete" size={24} color="#FF6347" />
          <Text style={[styles.settingText, { color: "#FF6347" }]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <DeleteAccountModal
        visible={deleteModalVisible}
        onClose={closeDeleteModal}
        onDeleteAccount={handleDeleteAccount}
      />
    </SafeAreaView>
  );
};
const ProfileSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
    <Stack.Screen
      name="NotificationSettings"
      component={NotificationSettingsScreen}
    />
    <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
    <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
    <Stack.Screen name="ThemeSettings" component={ThemeSettingsScreen} />
    <Stack.Screen name="SecuritySettings" component={SecuritySettingsScreen} />
  </Stack.Navigator>
);

export default ProfileSettingsStack;