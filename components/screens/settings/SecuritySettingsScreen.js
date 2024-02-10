// SecuritySettingsScreen.js
import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const SecuritySettingsScreen = () => {
  const [enableTwoFactorAuth, setEnableTwoFactorAuth] = useState(false);
  const [biometricAuthentication, setBiometricAuthentication] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Two-Factor Authentication</Text>
        <Switch
          value={enableTwoFactorAuth}
          onValueChange={(value) => setEnableTwoFactorAuth(value)}
          trackColor={{ false: "#fff", true: "#70B7ED" }}
          thumbColor={enableTwoFactorAuth ? "#fff" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Biometric Authentication</Text>
        <Switch
          value={biometricAuthentication}
          onValueChange={(value) => setBiometricAuthentication(value)}
          trackColor={{ false: "#fff", true: "#70B7ED" }}
          thumbColor={biometricAuthentication ? "#fff" : "#f4f3f4"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingText: {
    fontSize: 16,
  },
});

export default SecuritySettingsScreen;
