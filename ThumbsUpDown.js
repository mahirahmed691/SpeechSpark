import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Video from "react-native-video";

const ThumbsUpDown = ({ onThumbsUp, onThumbsDown }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const thumbsUpImage = require('./assets/Yes.gif');
  const thumbsDownImage = require('./assets/No.gif');

  const handleThumbsUp = () => {
    setModalText("Yes");    setModalVisible(true);    onThumbsUp();
  };

  const handleThumbsDown = () => {
    setModalText("No");
    setModalVisible(true);
    onThumbsDown();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleThumbsUp} style={styles.button}>
        <FontAwesome name="thumbs-up" size={20} color="teal" />
        <Text>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleThumbsDown} style={styles.button}>
        <FontAwesome name="thumbs-down" size={20} color="crimson" />
        <Text>No</Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          {modalText === "Yes" ? (
            <Image source={thumbsUpImage} style={styles.image} />
          ) : (
            <Image source={thumbsDownImage} style={styles.image} />
          )}

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    marginTop:30
  },
  image: {
    width: "100%",
    height: 250,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(205, 104, 255, 0.9)",
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "50%",
    bottom: "25%",
    width: "100%",
  },
  modalText: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
  },
});

export default ThumbsUpDown;
