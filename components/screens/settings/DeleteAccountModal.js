// DeleteAccountModal.js
import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const DeleteAccountModal = ({ visible, onClose, onDeleteAccount }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to delete your account (Data will be lost).</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDeleteAccount}>
            <Text style={[styles.buttonText, { color: "#fff" }]}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#A9CFCF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
    fontWeight:'600'
  },
  cancelButton: {
    backgroundColor: "#38B5FD",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    color:'red',
    marginBottom:10
  },
  deleteButton: {
    backgroundColor: "#FE89A9",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
color:'white'
  },
});

export default DeleteAccountModal;
