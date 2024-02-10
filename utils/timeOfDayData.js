import { TouchableOpacity, View, Image, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "../components/screens/styles";
export const timesOfDayColors = {
  morningRoutine: "#AACFD0",
  lunchtime: "#AACFD0",
  afternoonNap: "#AACFD0",
  playtime: "#FFB6C1",
  studyTime: "#FFB6C1",
  dinner: "#FFB6C1",
  eveningRelaxation: "#AACFD0",
  bedtimeStories: "#AACFD0",
  restaurant: "#FFB6C1",
  carTime: "#FFB6C1",
  goingOut: "#FFB6C1",
  holiday: "#AACFD0",
  phrases: "#AACFD0",
  bathTime: "#AACFD0",
};

export const timesOfDay = [
  {
    id: 1,
    text: "Breakfast",
    icon: "sun",
    backgroundColor: timesOfDayColors.morningRoutine,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/10562/screenshots/14185674/media/5e251a2a4ea610186ff094f92f6af231.jpg?resize=1600x1200&vertical=center",
  },
  {
    id: 2,
    text: "Lunchtime",
    icon: "utensils",
    backgroundColor: timesOfDayColors.lunchtime,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/1335467/screenshots/3059003/media/234b9b1d7f7cae330fa8dd6df8f40c9f.png?resize=400x300&vertical=center",
  },
  {
    id: 3,
    text: "Nap time",
    icon: "bed",
    backgroundColor: timesOfDayColors.afternoonNap,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/730703/screenshots/4318271/media/a50dc3483fbd88f311a0b4a2daa3622b.jpg?resize=800x600&vertical=center",
  },
  {
    id: 4,
    text: "Playtime",
    icon: "gamepad",
    backgroundColor: timesOfDayColors.playtime,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/141092/screenshots/3459816/media/5bfe05da84fdffeb4f243088dae30604.jpg?resize=800x600&vertical=center",
  },
  {
    id: 5,
    text: "Study",
    icon: "book",
    backgroundColor: timesOfDayColors.studyTime,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/1652983/screenshots/4100705/__w.png?resize=800x600&vertical=center",
  },
  {
    id: 6,
    text: "Dinner",
    icon: "utensils",
    backgroundColor: timesOfDayColors.dinner,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/1320478/screenshots/18128534/media/ab50d073ac9b5bc52db3d7586fed1183.jpg?resize=1600x1200&vertical=center",
  },
  {
    id: 7,
    text: "Relax",
    icon: "bed",
    backgroundColor: timesOfDayColors.eveningRelaxation,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/14765/screenshots/623634/media/384458dae230ea1c223dee520cec60aa.png?resize=400x300&vertical=center",
  },
  {
    id: 8,
    text: "Game Night",
    icon: "gamepad",
    backgroundColor: timesOfDayColors.gameNight,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/18463/screenshots/4482340/2018-gamenight-sm.png?resize=800x600&vertical=center",
  },
  {
    id: 9,
    text: "Bedtime",
    icon: "book",
    backgroundColor: timesOfDayColors.bedtimeStories,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/64261/screenshots/314636/bedtime_bbb72.png?resize=400x300&vertical=center",
  },
  {
    id: 10,
    text: "Restaurant",
    icon: "table",
    backgroundColor: timesOfDayColors.restaurant,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/1199246/screenshots/4231374/media/37858d6f84c2586b128cfdc157c05251.png?resize=800x600&vertical=center",
  },
  {
    id: 11,
    text: "Journey",
    icon: "car",
    backgroundColor: timesOfDayColors.carTime,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/2939235/screenshots/14906891/media/a831206f10b659b6c39b00da20af4acf.jpg?resize=1600x1200&vertical=center",
  },
  {
    id: 12,
    text: "Going out",
    icon: "tree",
    backgroundColor: timesOfDayColors.goingOut,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/319371/screenshots/3131142/media/1818cac84410fd7f009eb4dc18d28e83.gif",
  },
  {
    id: 13,
    text: "Holiday",
    icon: "plane",
    backgroundColor: timesOfDayColors.holiday,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/776185/screenshots/2404558/media/dbfd726e40cac8754e9eccd22bbede0b.gif",
  },
  {
    id: 14,
    text: "Phrases",
    icon: "sms",
    backgroundColor: timesOfDayColors.phrases,
    imagePlaceholder:
      "https://cdn.dribbble.com/users/3863246/screenshots/16276147/dribb104sm.png?resize=700x525&vertical=center",
  },
  {
    id: 15,
    text: "Bath time",
    icon: "bath",
    backgroundColor: timesOfDayColors.bathTime,
    imagePlaceholder:
      "https://cdn.dribbble.com/userupload/12275151/file/original-ca12664ff2a493a41072810d72f27620.gif",
  },
];

export const TimesOfDayTile = ({ time, navigation, selected, style }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation) {
          navigation.navigate("Deck", { title: time.text });
        } else {
          console.warn("Navigation prop is not available");
        }
      }}
    >
      <View
        style={[
          styles.tile,
          {
            borderRadius: 20,
            fontWeight: "700",
          },
        ]}
      >
        {time.imagePlaceholder && (
          <Image
            source={{ uri: time.imagePlaceholder }}
            style={styles.imageTile}
          />
        )}
      </View>
      <Text style={styles.tileText} numberOfLines={2}>
        {time.text}
      </Text>
    </TouchableOpacity>
  );
};

export const TimesOfDayList = ({ time, navigation, selected, style }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation) {
          navigation.navigate("Deck", { title: time.text });
        } else {
          console.warn("Navigation prop is not available");
        }
      }}
    >
      <View
        style={[
          styles.tile,
          {
            backgroundColor: selected ? "#FF6347" : time.backgroundColor,
            width: "90%",
            alignSelf: "center",
            height: 30,
            flexDirection: "row",
            paddingLeft: 20,
          },
        ]}
      >
        {time.imagePlaceholder && (
          <FontAwesome5 name={time.icon} size={14} color="#fff" />
        )}
        <Text style={styles.listText} numberOfLines={2}>
          {time.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
