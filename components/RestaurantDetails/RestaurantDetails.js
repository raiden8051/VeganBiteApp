import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

export default function RestaurantDetails({ route }) {
  const [currentRest, setCurrentRest] = useState({});
  useEffect(() => {
    setCurrentRest(route.params.restaurantDetails.menu);
  }, []);

  const [accordian, setActiveAccordain] = useState("");

  const toggleAccordian = (key) => {
    if (key === accordian) {
      setActiveAccordain("");
      return;
    }
    setActiveAccordain(key);
  };

  const childItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          borderBottomColor: "#DCDCDC",
          borderBottomWidth: 1,
        }}
      >
        <Text style={styles.accordianChildList}>{item}</Text>
        <Pressable
          style={{
            backgroundColor: "#3EB489",
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Pressable>
      </View>
    );
  };

  const parentItem = ({ item }) => {
    return (
      <View
        style={{
          width: "100",
        }}
        key={item}
      >
        <Pressable
          style={styles.accordianParent}
          onPress={() => toggleAccordian(item)}
        >
          <Text>{item}</Text>
        </Pressable>
        <View style={accordian === item ? styles.active : styles.inactive}>
          <View style={styles.accordianChild}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item}
              data={Object.keys(currentRest[item])}
              renderItem={childItem}
            ></FlatList>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      {Object.keys(currentRest).length > 0 && (
        <View style={styles.container}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: 800,
              margin: 16,
            }}
          >
            Menu
          </Text>
          <FlatList
            style={{ backgroundColor: "white" }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item}
            data={Object.keys(currentRest)}
            renderItem={parentItem}
          ></FlatList>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginVertical: 20,
    marginTop: 50,
    marginHorizontal: 16,
    marginBottom: 120,
    backgroundColor: "#DCDCDC",
    borderRadius: 12,
  },
  accordianParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#BEBEBE",
    borderRadius: 12,
  },
  accordianChild: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
    width: "100%",
    alignSelf: "center",
    borderBottomColor: "#BEBEBE",
    borderBottomWidth: 1,
  },
  accordianChildList: {
    padding: 10,
    margin: 10,
    borderRadius: 4,
  },
  active: {
    // display: "flex",
  },
  inactive: {
    display: "none",
  },
});
