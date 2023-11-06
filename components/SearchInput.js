import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { TouchableHighlight, PermissionsAndroid } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Geocoder from "react-native-geocoding";

export default function SearchInput({ placeholder, type }) {
  const navigation = useNavigation();
  const requestMicPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Mic access Permission",
          message: "Please allow access to mic to use audio feature",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Deny",
          buttonPositive: "Accept",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        alert("You can use the mic");
      } else {
        alert("Mic permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const updateAddressDB = async (address) => {
    const response = await fetch("http://192.168.1.11:3001/api/updateaddress", {
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
    });
    const data = await response.json();

    if (!data.success) {
      console.log(data);
      alert("Something went wrong");
    }
  };

  const handleConfirmLocation = (coordinate) => {
    // console.log(e.nativeEvent);
    Geocoder.from(coordinate.lat, coordinate.lng)
      .then((json) => {
        var addressComponent = json.results[0].address_components;

        let add = {
          type: "Home",
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

        updateAddressDB(add);

        navigation.navigate("location", {
          postalAddress: add,
        });
      })
      .catch((error) => console.warn(error));
  };

  return type === "food_search" ? (
    <View style={[styles.inputView, styles.shadowProp]}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#262626"
        activeUnderlineColor="transparent"
        underlineColor="transparent"
      ></TextInput>
      <TouchableHighlight
        style={styles.voiceButton}
        onPress={() => requestMicPermission()}
        hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
      >
        <FontAwesomeIcon icon={faMicrophone} />
      </TouchableHighlight>
    </View>
  ) : (
    <SafeAreaView style={{ flex: 0, alignItems: "center" }}>
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text
          style={{
            marginTop: 30,
            fontWeight: 800,
            fontSize: 16,
            color: "#262626",
          }}
        >
          Enter your area or apartment name
        </Text>
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          placeholder={placeholder}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            handleConfirmLocation(details.geometry.location);
            // return data;
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              height: 44,
              color: "#5d5d5d",
              fontSize: 16,
              padding: 30,
              marginVertical: 12,
              // marginHorizontal: 20,
              elevation: 10,
              shadowColor: "#171717",
            },
          }}
          minLength={2}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          query={{
            key: "AIzaSyBBQPwpIZNLrCeU9poKzHJr-sbJHhzpoxA",
            language: "en",
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    width: "90%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    height: 50,
    backgroundColor: "#fff",
    paddingLeft: 20,
    fontSize: 14,
  },
  inputView: {
    // flex: 1,
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginTop: 10,
  },
  voiceButton: {
    top: 18,
    alignSelf: "flex-end",
    right: 40,
    position: "absolute",
  },
  shadowProp: {
    elevation: 10,
    shadowColor: "#171717",
  },
});
