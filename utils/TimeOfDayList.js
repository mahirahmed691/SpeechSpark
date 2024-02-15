import React from "react";
import { FlatList } from "react-native";

const TimesOfDayList = ({ data, currentTimeOfDay }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(time) => time.id.toString()}
      renderItem={({ item }) => (
        <TimesOfDayList
          time={item}
          navigation={navigation}
          selected={item.text === currentTimeOfDay}
        />
      )}
    />
  );
};

export default TimesOfDayList;
