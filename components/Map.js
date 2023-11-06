import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as ELocation from "expo-location";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons/faLocationCrosshairs";
import Geocoder from "react-native-geocoding";

export default function Map({ navigation }) {
  const [postalAddress, setPostalAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    lat: "",
    lng: "",
  });

  const mapViewRef = useRef(null);

  const [isCurrentLocation, setIsCurrentLocation] = useState(true);

  const [coordinate, setCoordinate] = useState({
    lat: 25.612677,
    lng: 85.158875,
  });

  const [currentCoordinate, setCurrentCoordinate] = useState({
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
      setCurrentCoordinate((prev) => ({
        ...prev,
        lat: location?.coords?.latitude,
        lng: location?.coords?.longitude,
      }));
    })();
  }, []);

  const handleMarketDrag = (e) => {
    e.persist();
    setIsCurrentLocation(false);
    setCoordinate((prev) => ({
      ...prev,
      lat: e?.nativeEvent?.coordinate?.latitude,
      lng: e?.nativeEvent?.coordinate?.longitude,
    }));
  };

  const handleConfirmLocation = () => {
    // console.log(e.nativeEvent);
    Geocoder.from(coordinate.lat, coordinate.lng)
      .then((json) => {
        var addressComponent = json.results[0].address_components;

        let add = {
          line1: [
            addressComponent.filter((a) => {
              return a.types.includes("plus_code");
            })[0]?.long_name,
            addressComponent.filter((a) => {
              return (
                a.types.includes("premise") || a.types.includes("establishment")
              );
            })[0]?.long_name,
            addressComponent.filter((a) => {
              return (
                a.types.includes("route") || a.types.includes("neighborhood")
              );
            })[0]?.long_name,
            addressComponent.filter((a) => {
              return a.types.includes("sublocality");
            })[0]?.long_name,
          ],
          city: addressComponent.filter((a) => {
            return a.types.includes("locality");
          })[0]?.long_name,
          state: addressComponent.filter((a) => {
            return a.types.includes("administrative_area_level_1");
          })[0]?.long_name,
          zip: addressComponent.filter((a) => {
            return a.types.includes("postal_code");
          })[0]?.long_name,
          country: addressComponent.filter((a) => {
            return a.types.includes("country");
          })[0]?.long_name,
          lat: coordinate.lat,
          lng: coordinate.lng,
        };

        if (addressComponent) {
          setPostalAddress((prev) => ({
            ...prev,
            ...add,
          }));
        }

        updateAddressDB(add).then(() =>
          navigation.navigate("location", {
            update: true,
          })
        );
      })
      .catch((error) => console.warn(error));
  };

  const updateAddressDB = async (address) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "http://192.168.1.11:3001/api/updateaddress",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: 1234,
              type: "Home",
              line1: address.line1,
              city: address.city,
              state: address.state,
              country: address.country,
              postal_code: address.zip,
              lat: address.lat,
              lng: address.lng,
            }),
          }
        );
        const data = await response.json();

        if (!data.success) {
          console.log(data);
          alert("Something went wrong");
          reject();
        }
        resolve();
      } catch (error) {
        reject();
        console.log(error);
      }
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <MapView
          ref={mapViewRef}
          style={styles.map}
          region={{
            latitude: coordinate.lat,
            longitude: coordinate.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={(e) => handleMarketDrag(e)}
        >
          <Marker
            draggable
            coordinate={{
              latitude: isCurrentLocation
                ? currentCoordinate.lat
                : coordinate.lat,
              longitude: isCurrentLocation
                ? currentCoordinate.lng
                : coordinate.lng,
            }}
            onDragEnd={(e) => handleMarketDrag(e)}

            // image={
            //   {
            //     //   uri: "https://toppng.com//public/uploads/preview/eat-play-do-icon-map-marker-115548254600u9yjx6qhj.png",
            //   }
            // }
          />
        </MapView>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 50,
          position: "absolute",
          bottom: 40,
          flexDirection: "row",
          gap: 20,
        }}
      >
        <TouchableOpacity
          style={{
            // width: "60%",
            padding: 20,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 100,
            borderColor: "#BEBEBE",
            elevation: 10,
            shadowColor: "#171717",
          }}
          onPress={() => {
            setIsCurrentLocation(true);
            mapViewRef?.current?.animateCamera({
              center: {
                latitude: currentCoordinate.lat,
                longitude: currentCoordinate.lng,
              },
            });
          }}
        >
          <FontAwesomeIcon
            style={{ color: "crimson" }}
            icon={faLocationCrosshairs}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // width: "60%",
            paddingHorizontal: 20,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "crimson",
            borderRadius: 12,
            elevation: 10,
            shadowColor: "#171717",
          }}
          onPress={() => handleConfirmLocation()}
        >
          <Text style={{ color: "white" }}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
