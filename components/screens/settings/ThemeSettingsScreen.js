import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch, TextInput, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ThemeSettingsScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#FE89A9");
  const [accentColor, setAccentColor] = useState("#70B7ED");
  const [selectedTheme, setSelectedTheme] = useState("default");

  const handleThemeChange = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const handleColorChange = (color) => {
    setPrimaryColor(color);
  };

  const handleAccentColorChange = (color) => {
    setAccentColor(color);
  };

  const themes = [
    { id: "default", name: "Default Theme" },
    { id: "ocean", name: "Ocean Theme" },
    { id: "forest", name: "Forest Theme" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Theme</Text>
        <Switch
          trackColor={{ false: "#FFF", true: "#38B5FD" }}
          thumbColor={isDarkTheme ? "#FFF" : "#38B5FD"}
          ios_backgroundColor="#FFF"
          onValueChange={handleThemeChange}
          value={isDarkTheme}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Primary Color</Text>
        <TextInput
          style={styles.colorInput}
          placeholder="Primary Color"
          value={primaryColor}
          onChangeText={handleColorChange}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Accent Color</Text>
        <TextInput
          style={styles.colorInput}
          placeholder="Accent Color"
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
                { backgroundColor: item.id === selectedTheme ? primaryColor : "#FFF" },
              ]}
              onPress={() => setSelectedTheme(item.id)}
            >
              <Text style={{ color: item.id === selectedTheme ? "#FFF" : primaryColor }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => console.log("Save Changes")}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
        <Ionicons name="save-outline" size={24} color="#FFF" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  settingItem: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  colorInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    padding: 10,
    backgroundColor: "#FFF",
  },
  themeItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#38B5FD",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default ThemeSettingsScreen;
