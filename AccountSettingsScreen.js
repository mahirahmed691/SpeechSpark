// AccountSettingsScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const AccountSettingsScreen = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(require('./assets/Logo.png'));

  const handleChooseProfilePic = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setProfilePic({ uri: result.uri });
    }
  };

  const handleSaveChanges = () => {
    console.log("Changes saved successfully!");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChooseProfilePic}>
        <View style={styles.profilePicContainer}>
          <Image source={profilePic} style={styles.profilePic} resizeMode="cover" />
          <View style={styles.profilePicOverlay}>
            <Text style={styles.profilePicOverlayText}>+</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Change Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Enter new password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  profilePicContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    position: 'relative',
  },
  profilePic: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profilePicOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicOverlayText: {
    color: '#fff',
    fontSize: 24,
  },
  settingItem: {
    marginBottom: 20,
    width: "100%",
  },
  settingLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AccountSettingsScreen;
