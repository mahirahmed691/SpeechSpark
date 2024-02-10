// NotificationSettingsScreen.js
import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const NotificationSettingsScreen = () => {
  const [receivePushNotifications, setReceivePushNotifications] = useState(true);
  const [receiveEmailNotifications, setReceiveEmailNotifications] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Receive Push Notifications</Text>
        <Switch
          value={receivePushNotifications}
          onValueChange={(value) => setReceivePushNotifications(value)}
          trackColor={{ false: "#fff", true: "#FE89A9" }}
          thumbColor={receivePushNotifications ? "#fff" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Receive Email Notifications</Text>
        <Switch
          value={receiveEmailNotifications}
          onValueChange={(value) => setReceiveEmailNotifications(value)}
          trackColor={{ false: "#fff", true: "#FE89A9" }}
          thumbColor={receiveEmailNotifications ? "#fff" : "#f4f3f4"}
        />
      </View>
      <View style={styles.notificationPreference}>
        <Text style={styles.sectionHeader}>Notification Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Events</Text>
          <Switch value={true} disabled={true} trackColor={{ false: "#fff", true: "#FE89A9" }} thumbColor="#fff" />
        </View>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>News</Text>
          <Switch value={false} trackColor={{ false: "#fff", true: "#FE89A9" }} thumbColor="#fff" />
        </View>
        {/* Add more notification preferences */}
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
  notificationPreference: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  preferenceText: {
    fontSize: 16,
  },
});

export default NotificationSettingsScreen;
