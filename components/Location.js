import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import * as ELocation from "expo-location";

export default function Location() {
  const [coordinate, setCoordinate] = useState({
    lat: 25.612677,
    lng: 85.158875,
  });
  useEffect(() => {
    (async () => {
      let { status } = await ELocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await ELocation.getCurrentPositionAsync({});
      console.log(location?.coords?.latitude);
      setCoordinate((prev) => ({
        ...prev,
        lat: location?.coords?.latitude,
        lng: location?.coords?.longitude,
      }));
    })();
  }, []);

  const handleMarketDrag = (e) => {
    setCoordinate((prev) => ({
      ...prev,
      lat: e?.nativeEvent?.coordinate?.latitude,
      lng: e?.nativeEvent?.coordinate?.longitude,
    }));
  };

  return (
    <LinearGradient colors={["crimson", "#ffffff"]} style={styles.gradient}>
      <SearchInput placeholder={"Search food location"} type={"location"} />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: coordinate.lat,
            longitude: coordinate.lng,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          <Marker
            draggable
            coordinate={{ latitude: coordinate.lat, longitude: coordinate.lng }}
            onDragEnd={(e) => handleMarketDrag(e)}
            // image={
            //   {
            //     //   uri: "https://toppng.com//public/uploads/preview/eat-play-do-icon-map-marker-115548254600u9yjx6qhj.png",
            //   }
            // }
          />
        </MapView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
  },
  container: {
    alignItems: "center",
  },
  map: {
    width: "80%",
    height: "70%",
  },
});
