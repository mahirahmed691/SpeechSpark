// PrivacySettingsScreen.js
import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const PrivacySettingsScreen = () => {
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [enablePrivateProfile, setEnablePrivateProfile] = useState(false);
  const [receiveEmails, setReceiveEmails] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Show Online Status</Text>
        <Switch
          value={showOnlineStatus}
          onValueChange={(value) => setShowOnlineStatus(value)}
          trackColor={{ false: "#FFF", true: "#FE89A9" }}
          thumbColor={showOnlineStatus ? "#FFF" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Private Profile</Text>
        <Switch
          value={enablePrivateProfile}
          onValueChange={(value) => setEnablePrivateProfile(value)}
          trackColor={{ false: "#FFF", true: "#FE89A9" }}
          thumbColor={enablePrivateProfile ? "#FFF" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Receive Emails</Text>
        <Switch
          value={receiveEmails}
          onValueChange={(value) => setReceiveEmails(value)}
          trackColor={{ false: "#FFF", true: "#FE89A9" }}
          thumbColor={receiveEmails ? "#FFF" : "#fff"}
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
    color: '#333',
  },
});

export default PrivacySettingsScreen;
