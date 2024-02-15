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

const DrawingGame = ({ closeModal }) => {
  const [path, setPath] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [currentColor, setCurrentColor] = useState("pink");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [brushSize, setBrushSize] = useState(5); // default brush size
  const [backgroundImage, setBackgroundImage] = useState(null); // state for background image
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
      { x: locationX, y: locationY, color: currentColor, size: brushSize },
    ]);
  };

  const selectColor = (color) => {
    setCurrentColor(color);
    setShowColorPicker(false);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleBrushSizeChange = (size) => {
    setBrushSize(size);
  };

  const handleSaveDrawing = () => {
    // Implement logic to save drawing
  };

  const handleShareDrawing = () => {
    // Implement logic to share drawing
  };

  const handleBackgroundImageChange = (image) => {
    setBackgroundImage(image);
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

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer} {...panResponder.panHandlers}>
        <View
          style={[
            styles.canvas,
            { backgroundColor: gameOver ? "#ECECEC" : "#FFFFFF" },
          ]}
        >
          {/* Render background image if set */}
          {backgroundImage && (
            <Image
              source={{ uri: backgroundImage }}
              style={styles.backgroundImage}
            />
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
                    width: point.size,
                    height: point.size,
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
          onPress={handleSaveDrawing}
          style={styles.controlButton}
        >
          <MaterialIcons name="save" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShareDrawing}
          style={styles.controlButton}
        >
          <MaterialIcons name="share" size={24} color="green" />
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
  colorButton: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 25,
  },
  closeColorPickerButton: {
    marginTop: 20,
  },
  closeColorPickerText: {
    color: "#000",
    fontSize: 16,
  },
  controlButton: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
  },
});

export default DrawingGame;
