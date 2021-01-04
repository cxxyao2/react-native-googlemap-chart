import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

const DEFAULT_CORD = {
  lat: 48.89,
  lng: 2.34,
};
export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: DEFAULT_CORD.lat,
          longitude: DEFAULT_CORD.lng,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1,
        }}
        scrollEnabled={false}
        liteMode={true}
      ></MapView>
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
