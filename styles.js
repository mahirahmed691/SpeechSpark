import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;
const isIpad = Platform.OS === "ios" && windowWidth > 768;

const colors = {
  primaryBackground: "#FFF", // Light Blue
  tileBackground: "#FFFFFF", // White
  cardText: "#38B5FD", // Muted Purple
  shadowColor: "rgba(173, 216, 230, 0.8)", // Light Turquoise
  visualFlashcardBackground: "#F0F8FF", // Alice Blue
  expandedFlashcardTitleTextShadow: "rgba(0, 125, 125, 1)",
  buttonBackground: "#38B5FD", // Sky Blue
  buttonText: "#fff", // White
  modalOverlay: "rgba(169, 169, 169, 0.5)", // Dark Gray
  modalContentBackground: "#F0F8FF", // Alice Blue
  modalButtonBackground: "#FFA07A", // Light Salmon
  modalButtonTextColor: "#fff", // White
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  logo: {
    marginTop: 12,
    width: isIpad ? "33%" : "33%",
    height: 50,
    marginRight:120,
  },
  profileLogo: {
    marginTop: 10,
    marginBottom: 40,
    width: "100%",
    height: isIpad ? 100 : 100,
  },
  tilesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tile: {
    margin: 2,
    padding: 0,
    backgroundColor: colors.tileBackground,
    elevation: 5,
    alignItems: "center",
    width: isIpad ? windowWidth / 5 - 10 : windowWidth / 3 - 10,
  },
  tileText: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom:5,
    marginTop:5
  },
  listText: {
    fontSize: 14,
    letterSpacing: 1.5,
    fontWeight: "700",
    color: "#fff",
    marginTop: 0,
    marginLeft:10
  },
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 25,
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
  },
  cardText: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.cardText,
    textAlign: "center",
  },
  NoCardText: {
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginTop: "10%",
    textShadowColor: colors.shadowColor,
    textShadowOffset: { width: 5, height: 2 },
    textShadowRadius: 5,
  },
  image: {
    width: isIpad ? 400 : 300,
    height: isIpad ? 200 : 200,
    alignSelf: "center",
    borderRadius: 40,
  },
  imageTile: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    borderRadius: 20,
  },

  dateText: {
    position: "absolute",
    top: -5,
    fontWeight: "800",
    color: "#FFF",
    textAlign: "center",
    letterSpacing: 2,
    fontSize: 70,
    width: "100%",
    marginBottom: 10,
  },
  visualFlashcard: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.visualFlashcardBackground,
    marginVertical: 5,
    alignItems: "center",
  },
  visualFlashcardImage: {
    width: isIpad ? "95%" : 350,
    height: isIpad ? 500 : 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  visualFlashcardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  expandedFlashcardImage: {
    flex: 1,
    margin: isIpad ? 180 : 150,
    width: isIpad ? "100%" : 350,
    height: isIpad ? 400 : 420,
    resizeMode: "cover",
    borderRadius: 30,
    overflow: "hidden", // Ensure borderRadius is applied
  },
  expandedFlashcardTitle: {
    fontSize: isIpad ? 50 : 18,
    position:'absolute',
    bottom: isIpad ? 0 : 0,
    fontWeight: "400",
    letterSpacing:2,
    color: "#fff",
    backgroundColor:'black',
    width:'100%',
    textAlign:'center',
    padding:15

  },
  imageOverlay: {
    flex: 1,

    alignItems: "center",
  },
  ExpandContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primaryBackground,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsContainer: {
    padding: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingText: {
    marginLeft: 16,
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: -6,
    paddingBottom: 8,
  },
  searchInput: {
    height: 50,
    borderColor: "#A9CFCF",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#000",
  },
  selectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  selectionItem: {
    margin: 5,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    alignItems: "center",
    width: isIpad ? windowWidth / 8 - 10 : windowWidth / 5 - 10,
  },
  selectionItemText: {
    fontSize: 10,
    letterSpacing: 0.5,
    fontWeight: "900",
    color: "#fff",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    height: 50,
    backgroundColor: colors.buttonBackground,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.modalContentBackground,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  modalButton: {
    backgroundColor: colors.modalButtonBackground,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: colors.modalButtonTextColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleLayoutButton: {
    backgroundColor: "#AACFD0",
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  toggleLayoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E90FF",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  quoteCard: {
    backgroundColor: "#D1EAF5",
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    width: 250,
  },
  quoteText: {
    fontSize: 14,
    color: "#1E90FF",
  },
  emojiSelector: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 12,
  },
  emojiButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  selectedEmojiButton: {
    backgroundColor: "#1E90FF",
  },
  emojiText: {
    fontSize: 30,
  },
  noteContainer: {
    marginBottom: 12,
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  noteInput: {
    height: 80,
  },
  input: {
    height: 40,
    borderColor: "#1E90FF",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#38B5FD",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  breathingButton: {
    backgroundColor: "#AACFD0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  breathingButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  breathingModalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  breathingModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  breathingModalInstructions: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  startBreathingButton: {
    backgroundColor: "#1E90FF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  startBreathingButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },

  breathingModalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  breathingModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  breathingModalInstructions: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },

  breathingModalTimer: {
    fontSize: 18,
    color: "#AACFD0",
    fontWeight: "bold",
  },
  navigatorButtonText: {
    fontSize: 15,
    fontWeight: "900",
    marginLeft: 10,
    color: "white",
  },
  sectionNavigator: {
    backgroundColor: "#39B6FF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
});

export default styles;