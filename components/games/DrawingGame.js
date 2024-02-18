import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder,
  Modal,
  Alert,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ColorBookGame = ({ closeModal }) => {
  const [path, setPath] = useState([]);
  const [currentColor, setCurrentColor] = useState("blue");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const prevTouchRef = useRef({ x: 0, y: 0 });

  const handleClear = () => {
    setPath([]);
  };

  const handleUndo = () => {
    if (path.length > 0) {
      setPath((prevPath) => prevPath.slice(0, -1));
    } else {
      Alert.alert("Nothing to undo!");
    }
  };

  const handleTouchMove = (event, gestureState) => {
    const { locationX, locationY } = event.nativeEvent;
    setPath((prevPath) => [
      ...prevPath,
      { x: locationX, y: locationY, color: currentColor },
    ]);
  };

  const selectColor = (color) => {
    setCurrentColor(color);
    setShowColorPicker(false);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const toggleImagePicker = () => {
    setShowImagePicker((prev) => !prev);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setShowImagePicker(false);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handleTouchMove,
    })
  ).current;

  // Define a list of colors for the palette
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "purple",
    "orange",
  ];

  // Pre-built images to color in
  const images = [
    require("../../assets/snowman.jpeg"),
    require("../../assets/unicorn.jpeg"),
    require("../../assets/horse.jpeg"),
    require("../../assets/lion.png"),
    require("../../assets/bird.jpeg"),
    require("../../assets/chick.jpeg"),
    // Add more images as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer} {...panResponder.panHandlers}>
        <View style={styles.canvas}>
          {/* Render selected image as background */}
          {selectedImage && (
            <Image source={selectedImage} style={styles.backgroundImage} />
          )}

          <View style={styles.pathContainer}>
            {path.map((point, index) => (
              <View
                key={index}
                style={[
                  styles.point,
                  {
                    left: point.x,
                    top: point.y,
                    backgroundColor: point.color,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleClear} style={styles.controlButton}>
          <MaterialIcons name="clear" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUndo} style={styles.controlButton}>
          <MaterialIcons name="undo" size={24} color="crimson" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleColorPicker}
          style={styles.controlButton}
        >
          <MaterialIcons name="palette" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleImagePicker}
          style={styles.controlButton}
        >
          <MaterialIcons name="photo" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      <Modal visible={showColorPicker} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.colorPickerContainer}>
            {/* Render color palette */}
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorButton, { backgroundColor: color }]}
                onPress={() => selectColor(color)}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.closeColorPickerButton}
            onPress={toggleColorPicker}
          >
            <Text style={styles.closeColorPickerText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={showImagePicker} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.imagePickerContainer}>
            {/* Render pre-built images */}
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImageSelect(image)}
                style={styles.imageButton}
              >
                <Image source={image} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.closeImagePickerButton}
            onPress={toggleImagePicker}
          >
            <Text style={styles.closeImagePickerText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <MaterialIcons name="close" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  canvasContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  pathContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  point: {
    position: "absolute",
    width: 10,
    height: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  colorPickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "60%",
  },
  imagePickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 200,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  colorButton: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 25,
  },
  imageButton: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  closeColorPickerButton: {
    marginTop: 20,
  },
  closeImagePickerButton: {
    marginTop: 20,
  },
  closeColorPickerText: {
    color: "#000",
    fontSize: 16,
  },
  closeImagePickerText: {
    color: "#000",
    fontSize: 16,
  },
  controlButton: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default ColorBookGame;
