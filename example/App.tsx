import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import * as Maps from "expo-maps";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

export default function App() {
  const [color, setColor] = React.useState(generateColor());
  return (
    <View style={styles.container}>
      <Text>Open up example/App.js to start working on your app!</Text>
      <Button
        title="Invoke someGreatMethodAsync"
        onPress={async () => {
          await Maps.someGreatMethodAsync({ someOption: "option" });
        }}
      />
      <Button
        title="Change color"
        onPress={async () => {
          setColor(generateColor());
        }}
      />
      <Maps.ExpoMap color={color} style={{ width: 200, height: 200 }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
