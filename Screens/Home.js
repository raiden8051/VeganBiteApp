import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Button, TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import RestaurantsCard from "../components/RestaurantsCard";
import data from "../components/swiggyDataSet.json";
import { FlatList } from "react-native";
import { Pressable } from "react-native";
import discountImage from "../assets/discount1.jpg";
import SearchInput from "../components/SearchInput";

const Home = ({ navigation }) => {
  const [cuisine, setCuisine] = useState([]);

  const [d, setD] = useState([]);

  const getData = async () => {
    const response = await fetch("http://192.168.1.11:3001/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setD(data);
  };

  useEffect(() => {
    let a = [];
    data.forEach((item) => {
      a.push({ name: item.cuisine, img: item.img, id: item._id });
    });
    setCuisine(Array.from(new Set(a)));
    getData();
  }, []);

  return (
    <LinearGradient colors={["crimson", "#ffffff"]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          <View style={styles.titleView}>
            <TouchableHighlight style={styles.homeButton}>
              <FontAwesomeIcon style={styles.homeButtonIcon} icon={faHome} />
            </TouchableHighlight>
            <Text style={styles.titleText}>VeganBite</Text>
            <TouchableHighlight style={styles.profileButton}>
              <FontAwesomeIcon style={styles.profileButtonIcon} icon={faUser} />
            </TouchableHighlight>
          </View>
          <SearchInput placeholder={"Search, Order, Enjoy, Repeat!"} />
          <View>
            <Image
              style={{
                aspectRatio: 11 / 6,
                // width: 400,
                height: 200,
                marginTop: 20,
                borderRadius: 12,
              }}
              source={{
                uri: "https://www.grabon.in/indulge/wp-content/uploads/2021/03/Swiggy-Coupons-Deals.jpg",
              }}
            />
          </View>

          <View style={styles.restCardView}>
            <Text style={styles.restCardTitle}>Cuisine</Text>
            <FlatList
              data={cuisine}
              horizontal
              renderItem={({ item }) => (
                <Pressable style={styles.cuisineView}>
                  <View>
                    <Image style={styles.cardImg} src={item.img} />
                    <Text>{item.name.split(" ")[0].substring(0, 6)}</Text>
                  </View>
                </Pressable>
              )}
              showsHorizontalScrollIndicator={false}
            ></FlatList>
          </View>
          <View style={styles.restCardView}>
            <Text style={styles.restCardTitle}>Search by restaurants</Text>
            <FlatList
              data={d}
              horizontal
              renderItem={({ item }) => (
                <RestaurantsCard value={item} navigation={navigation} />
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item["_id"]}
            ></FlatList>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Text style={styles.text}></Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 30,
    // justifyContent: "center",
    alignItems: "center",
  },
  cardImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#262626",
    borderWidth: 1,
    borderRadius: 20,
  },
  cuisineView: {
    // width: "100%",
    marginVertical: 10,
    marginRight: 20,
    alignSelf: "flex-start",
  },
  gradient: {
    flex: 1,
    width: "100%",
  },
  restCardView: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  restCardTitle: {
    alignSelf: "flex-start",
    color: "#262626",
    fontWeight: "900",
    fontSize: 20,
  },
  titleText: {
    color: "#f5f5f5",
    fontWeight: "900",
    fontSize: 20,
    paddingLeft: 24,
  },
  titleView: {
    width: "90%",
    paddingBottom: 10,
    position: "relative",
  },
  homeButtonIcon: {
    position: "absolute",
    top: 6,
    color: "#ffffff",
  },
  profileButton: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 6,
  },
  profileButtonIcon: {
    color: "#fff",
  },
});

export default Home;
