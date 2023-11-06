import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { faMap } from "@fortawesome/free-solid-svg-icons/faMap";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Geocoder from "react-native-geocoding";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Location({ route, navigation }) {
  const [address, setAddress] = useState({});
  const [streetAddress, setStreetAddress] = useState("");

  useEffect(() => {
    Geocoder.init("AIzaSyBBQPwpIZNLrCeU9poKzHJr-sbJHhzpoxA", {
      language: "en",
    });
    getAddress();
  }, []);

  const getAddress = async () => {
    response = await fetch("http://192.168.1.11:3001/api/getaddress", {
      method: "POST",
      body: JSON.stringify({ userId: "1234" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await response.json();
    if (data.success) {
      console.log(data?.data);
      setAddress(data?.data);
      let line1 = "";

      data?.data.line1.forEach((element) => {
        if (element) line1 += element + ", ";
      });
      setStreetAddress(line1);
    }
  };

  useEffect(() => {
    getAddress();
    console.log("first");
  }, [route]);

  // const getDat = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("address");
  //     if (value !== null) {
  //       // value previously stored
  //       console.log(JSON.parse(value));
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // const storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem("address", JSON.stringify(value));
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  return (
    // <LinearGradient colors={["crimson", "#ffffff"]} style={styles.gradient}>
    <View style={{ flex: 1 }}>
      <SearchInput placeholder={"Search food location"} type={"location"} />
      {Object.keys(address).length > 0 && (
        <View style={{ paddingHorizontal: 25, paddingVertical: 15 }}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "#505050",
            }}
          >
            Food will be delvered at this location
          </Text>
          <Text style={{ fontWeight: 700, fontSize: 16, color: "#505050" }}>
            {streetAddress}
            {address.city}, {address.state}, {address.zip}
          </Text>
        </View>
      )}
      <View style={{ flex: 0, margin: 10, paddingHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("map")}
          style={{
            flex: 0,
            flexDirection: "row",
            gap: 10,
            padding: 10,
            alignItems: "center",
          }}
        >
          <>
            <FontAwesomeIcon style={{ color: "crimson" }} icon={faMap} />
            <Text
              style={{
                color: "crimson",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Use map to locate your location
            </Text>
          </>
        </TouchableOpacity>
      </View>
      {Object.keys(address).length > 0 && (
        <>
          <View
            style={{
              borderBottomColor: "#bebebe",
              borderBottomWidth: 1,
              width: "90%",
              alignSelf: "center",
            }}
          ></View>
          <View
            style={{
              paddingVertical: 20,
              width: "90%",
              alignSelf: "center",
            }}
          >
            <Text style={{ letterSpacing: 2, color: "#303030" }}>
              Saved Addresses
            </Text>
            <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontWeight: 800 }}>{address.type}</Text>
              <Text>
                {streetAddress} {address.city}, {address.state}
              </Text>
            </View>
          </View>
        </>
      )}
      <Pressable
        style={{
          width: "30%",
          backgroundColor: "crimson",
          alignSelf: "center",
          bottom: 50,
          position: "absolute",
          padding: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("home", {
            update: true,
          })
        }
      >
        <Text style={{ color: "#f5f5f5", fontWeight: 700 }}>Back to food</Text>
      </Pressable>
    </View>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
