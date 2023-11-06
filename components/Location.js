import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { faMap } from "@fortawesome/free-solid-svg-icons/faMap";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Location({ route, navigation }) {
  const [address, setAddress] = useState({});
  const [streetAddress, setStreetAddress] = useState("");

  useEffect(() => {
    let a = route.params?.postalAddress || {};
    if (Object.keys(a).length > 0) {
      let line1 = "";

      a.line1.forEach((element) => {
        if (element) line1 += element + ", ";
      });
      setStreetAddress(line1);
    }
    setAddress(a || {});
  }, [route]);
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
    </View>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
