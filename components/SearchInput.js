import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { TouchableHighlight, PermissionsAndroid } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function SearchInput({ placeholder, type }) {
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
  return type === "food_search" ? (
    <View style={styles.inputView}>
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
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        return data;
      }}
      styles={{
        textInput: {
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
          padding: 30,
          marginVertical: 60,
          marginHorizontal: 20,
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
    borderColor: "#85929E",
    backgroundColor: "#fff",
    paddingLeft: 20,
    borderWidth: 1,
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
});
