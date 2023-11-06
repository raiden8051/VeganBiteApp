import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons/faFireFlameCurved";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons/faBowlFood";
import { faSortUp } from "@fortawesome/free-solid-svg-icons/faSortUp";
import { faSortDown } from "@fortawesome/free-solid-svg-icons/faSortDown";
import { ScrollView } from "react-native";
import SearchInput from "../SearchInput";
import { LinearGradient } from "expo-linear-gradient";

export default function RestaurantDetails({ route }) {
  const [currentMenu, setCurrentMenu] = useState({});
  const [currentRest, setCurrentRest] = useState({});
  useEffect(() => {
    setCurrentMenu(route.params.restaurantDetails.menu);
    setCurrentRest(route.params.restaurantDetails);
  }, []);

  const [cart, setCart] = useState([]);

  const [accordian, setActiveAccordain] = useState("");

  const toggleAccordian = (key) => {
    if (key === accordian) {
      setActiveAccordain("");
      return;
    }
    setActiveAccordain(key);
  };

  const handleAddToCart = (id) => {
    alert(id[1].price);
    setCart(id);
  };

  const childItem = ({ item }) => {
    // alert(item);
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          // paddingTop: 20,
          alignItems: "flex-start",
          justifyContent: "space-around",
          paddingRight: 20,
          borderBottomColor: "#DCDCDC",
          borderBottomWidth: 1,
        }}
      >
        <View style={{ width: "70%" }}>
          <Text style={[styles.accordianChildList, { paddingBottom: 0 }]}>
            {item[0]}
          </Text>
          <Text style={{ margin: 10, padding: 10, paddingTop: 0 }}>
            {"\u20B9"}
            {item[1].price}
          </Text>
        </View>
        <View
          style={{ margin: 10, padding: 10, paddingRight: 0, marginRight: 0 }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              paddingVertical: 6,
              paddingHorizontal: 20,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "#BCBCBC",
            }}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={{ color: "crimson" }}>Add</Text>
            {/* <FontAwesomeIcon icon={faPlus} /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const parentItem = ({ item }) => {
    return (
      <View key={item}>
        <Pressable
          style={styles.accordianParent}
          onPress={() => toggleAccordian(item)}
        >
          <Text style={{ fontSize: 16, fontWeight: 600 }}>{item}</Text>
          {accordian === item ? (
            <FontAwesomeIcon icon={faSortUp} style={{ color: "crimson" }} />
          ) : (
            <FontAwesomeIcon icon={faSortDown} style={{ color: "crimson" }} />
          )}
        </Pressable>
        <View style={accordian === item ? styles.active : styles.inactive}>
          <View style={styles.accordianChild}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item}
              data={Object.keys(currentMenu[item]).map((i) => [
                i,
                currentMenu[item][i],
              ])}
              renderItem={childItem}
            ></FlatList>
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={["crimson", "#ffffff"]} style={styles.gradient}>
      <SafeAreaView>
        <View>
          {Object.keys(currentMenu).length > 0 && (
            <>
              <View style={styles.shadowProp}>
                <View style={[styles.card, styles.shadowProp]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 800,
                        fontSize: 22,
                        color: "#36454F",
                      }}
                    >
                      {currentRest["name"]}
                    </Text>
                    <FontAwesomeIcon
                      icon={faBowlFood}
                      style={{ color: "#E67E22" }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={faFireFlameCurved}
                      style={{ color: "crimson" }}
                    />
                    <Text
                      style={{
                        fontWeight: 800,
                        fontSize: 16,
                        color: "#666362",
                        paddingLeft: 4,
                      }}
                    >
                      {currentRest["rating"]}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 800,
                        fontSize: 12,
                        color: "#666362",
                        paddingLeft: 6,
                      }}
                    >
                      ({currentRest["rating_count"]})
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#666362",
                      paddingBottom: 6,
                      borderBottomColor: "#BEBEBE",
                      borderBottomWidth: 1,
                    }}
                  >
                    {currentRest["cuisine"]}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#666362",
                      paddingTop: 6,
                    }}
                  >
                    {currentRest["address"]}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      width: "30%",
                      borderRadius: 4,
                      borderColor: "#388E3C",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faLeaf}
                      style={{ color: "#388E3C", paddingVertical: 20 }}
                    />
                    <Text>Pure Veg</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  gap: 10,
                  flexDirection: "row",
                  marginTop: 30,
                  justifyContent: "center",
                  width: "50%",
                  alignSelf: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faEllipsis}
                  style={[styles.rotateIcon, { color: "" }]}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#36454F",
                    letterSpacing: 2,
                  }}
                >
                  Menu
                </Text>
                <FontAwesomeIcon icon={faEllipsis} />
              </View>
              <SearchInput
                placeholder={"Search for dishes"}
                type={"food_search"}
              />
              <View style={[styles.container, styles.shadowProp]}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item}
                  data={Object.keys(currentMenu)}
                  renderItem={parentItem}
                ></FlatList>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingBottom: 24,
    marginVertical: 20,
    marginTop: 20,
    marginHorizontal: 16,
    height: "auto",
    // marginBottom: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  accordianParent: {
    flexDirection: "row",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#BEBEBE",
    borderRadius: 12,
    width: "100%",
    justifyContent: "space-between",
  },
  accordianChild: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
    borderBottomColor: "#BEBEBE",
    borderBottomWidth: 1,
  },
  accordianChildList: {
    fontSize: 16,
    fontWeight: 600,
    padding: 10,
    margin: 10,
    borderRadius: 4,
    width: "80%",
  },
  rotateIcon: {
    transform: [{ rotate: "180deg" }],
  },
  active: {
    // display: "flex",
  },
  inactive: {
    display: "none",
  },
  card: {
    borderRadius: 12,
    // height: 195,
    backgroundColor: "#FFFFFF",
    marginTop: 50,
    marginHorizontal: 15,
    padding: 20,
    gap: 1,
  },
  shadowProp: {
    elevation: 10,
    shadowColor: "#171717",
  },
});
