import { StyleSheet, Dimensions, Platform } from "react-native";
const windowWidth = Dimensions.get("window").width;
const isIpad = Platform.OS === "ios" && windowWidth > 768;

const colors = {
  primaryBackground: "#F0F0F0",
  tileBackground: "#FFFFFF",
  cardText: "#38B5FD",
  shadowColor: "rgba(173, 216, 230, 0.8)",
  visualFlashcardBackground: "#F0F8FF",
  expandedFlashcardTitleTextShadow: "rgba(0, 125, 125, 1)",
  buttonBackground: "#38B5FD",
  buttonText: "#fff",
  modalOverlay: "rgba(169, 169, 169, 0.5)",
  modalContentBackground: "#F0F8FF",
  modalButtonBackground: "#FFA07A",
  modalButtonTextColor: "#fff",
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
    marginRight: 120,
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
    marginBottom: 5,
    marginTop: 5,
  },
  listText: {
    fontSize: 14,
    letterSpacing: 1.5,
    fontWeight: "700",
    color: "#fff",
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
    fontSize: 20,
    fontWeight: "900",
    color: "black",
    textAlign: "center",
    letterSpacing: 2,
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
    textAlign: "center",
    fontSize: 60,
    width: "100%",
    marginLeft: 25,
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
  visualFlashcardImageTile: {
    width: isIpad ? "95%" : "100%",
    height: isIpad ? 500 : 120,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: "10%",
    marginTop: 20,
  },
  visualFlashcardTile: {
    width: isIpad ? "33%" : "30%",
    marginRight: "1.5%",
    height: isIpad ? 500 : 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  visualFlashcardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  visualFlashcardImageTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center",
  },
  toggleViewButton: {},
  toggleViewButtonText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  expandedFlashcardImage: {
    bottom: 100,
    margin: isIpad ? 180 : 150,
    width: isIpad ? "100%" : 380,
    height: isIpad ? 400 : 320,
    resizeMode: "cover",
    borderRadius: 20,
    overflow: "hidden", // Ensure borderRadius is applied
    borderWidth: 5,
    borderColor: "#f0f0f0",
    alignSelf: "center",
  },
  expandedFlashcardTitle: {
    fontSize: isIpad ? 50 : 12,
    position: "absolute",
    bottom: isIpad ? 0 : 0,
    fontWeight: "700",
    letterSpacing: 5,
    color: "#fff",
    backgroundColor: "black",
    width: "100%",
    textAlign: "center",
    padding: 15,
  },
  imageOverlay: {
    flex: 1,

    alignItems: "center",
  },
  ExpandContainer: {
    backgroundColor: colors.primaryBackground,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
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
    paddingHorizontal: 6,
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
  backgroundColor: "#rgb(169,207,207)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: colors.modalButtonTextColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCloseButton: {
    backgroundColor: "#FE89A9",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop:10,
  },
  modalCloseButtonText: {
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
    backgroundColor: "#FFF",
    marginRight: 20,
    padding: 20,
    width: "95%",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  quoteText: {
    fontSize: 15,
    color: "#000",
    width: "98%",
    fontWeight: "900",
    textAlign: "justify",
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
    backgroundColor: "#A9CFCF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  featureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  featureButton: {
    top: 30,
    backgroundColor: "#A9CFCF",
    padding: 10,
    borderRadius: 8,
  },
  featureButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  speechRateContainer: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    top: 600,
    position: "absolute",
    left: 0,
    right: 0,
  },
  speechRateLabel: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "900",
    color: "#000",
    alignSelf: "flex-start",
  },
  speechRateSlider: {
    width: "95%",
    alignSelf: "center",
  },
  speechRateValue: {
    fontSize: 16,
    fontWeight: "900",
    alignSelf: "flex-end",
    marginRight: 30,
  },
  favButton: {
    backgroundColor: "#f0f0f0",
    top: 30,
    padding: 10,
    borderRadius: 8,
  },
  textInput: {
    backgroundColor: "#f0f0f0",
    borderWidth: 0,
  },
  noCardSelectedText: {
    fontSize: 20,
    position: "absolute",
    top: 220,
    alignSelf: "center",
  },
  sleepQualityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  sleepQualityLabel: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "700",
    color: "#000", // Adjust color as needed
  },
  sleepQualityButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#A9CFCF", // Adjust background color as needed
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedSleepQualityButton: {
    backgroundColor: "#37B7FD", // Adjust background color for selected state
  },
  sleepQualityButtonText: {
    fontSize: 18,
    color: "#FFF", // Adjust text color as needed
  },
  sleepTrackerInput: {
    backgroundColor: "#fff",
  },
  showTipsButtonText: {
    marginTop: 20,
    fontWeight: "900",
  },
  fullScreenModal: {
    margin: 0,
    width: "100%",
    alignSelf: "center",
  },
  wellnessTipContent: {
    height: "100%",
    backgroundColor: "#fff",
  },
  wellnessModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
  modalTipText: {
    marginLeft: 20,
    width: "90%",
    marginTop: 0,
    marginBottom: 10,
    fontWeight: "900",
  },
  closeModalButton: {
    width: "90%",
    backgroundColor: "#rgb(169,207,207)",
    alignSelf: "center",
    padding: 15,
    borderRadius: 20,
  },
  closeModalButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "900",
  },
  tipImage: {
    width: "95%",
    height: 250, // Set the height as needed
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default styles;
