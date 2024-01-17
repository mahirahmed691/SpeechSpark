// ThemeSettingsScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, TextInput, FlatList } from "react-native";

const ThemeSettingsScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#FE89A9"); // Updated primary color
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [accentColor, setAccentColor] = useState("#70B7ED"); // Updated accent color

  const handleThemeChange = () => {
    // Implement logic to switch theme (e.g., update a global state, persist in AsyncStorage, etc.)
    setIsDarkTheme((prev) => !prev);
  };

  const handleColorChange = (color) => {
    // Implement logic to validate and set the primary color
    setPrimaryColor(color);
  };

  const handleAccentColorChange = (color) => {
    // Implement logic to validate and set the accent color
    setAccentColor(color);
  };

  const themes = [
    { id: "default", name: "Default Theme" },
    { id: "ocean", name: "Ocean Theme" },
    { id: "forest", name: "Forest Theme" },
    // Add more predefined themes as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Theme</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleThemeChange}
          value={isDarkTheme}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Primary Color</Text>
        <TextInput
          style={styles.colorInput}
          placeholder="Enter hex color code"
          value={primaryColor}
          onChangeText={handleColorChange}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Accent Color</Text>
        <TextInput
          style={styles.colorInput}
          placeholder="Enter hex color code"
          value={accentColor}
          onChangeText={handleAccentColorChange}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Select Theme</Text>
        <FlatList
          data={themes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.themeItem,
                { backgroundColor: item.id === selectedTheme ? "#FE89A9" : "#fff" },
              ]}
              onPress={() => setSelectedTheme(item.id)}
            >
              <Text style={{ color: item.id === selectedTheme ? "#fff" : "#FE89A9" }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => console.log("Save Changes")}>
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
  },
  settingItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  settingLabel: {
    fontSize: 18,
    color: "#333",
  },
  colorInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    padding: 8,
  },
  themeItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FE89A9",
    alignItems: "center",
  },
  saveButton: {
    bottom: 40,
    position: "absolute",
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ThemeSettingsScreen;
