import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  PermissionsAndroid,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Button, TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import RestaurantsCard from "./RestaurantsCard";
import data from "./swiggyDataSet.json";
import { FlatList } from "react-native";
import { Pressable } from "react-native";
import discountImage from "../assets/discount1.jpg";

const Home = () => {
  const [cuisine, setCuisine] = useState([]);

  useEffect(() => {
    let a = [];
    data.forEach((item) => {
      a.push({ name: item.cuisine, img: item.img, id: item._id });
    });
    setCuisine(Array.from(new Set(a)));
  }, []);
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

  return (
    <LinearGradient colors={["#3EB489", "#ffffff"]} style={styles.gradient}>
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
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Search, Order, Enjoy, Repeat!"
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
              data={data}
              horizontal
              renderItem={({ item }) => <RestaurantsCard value={item} />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
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
  textInput: {
    width: "90%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    height: 50,
    borderColor: "#85929E",
    borderWidth: 1,
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
