import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faHeart as faHeartS } from "@fortawesome/free-solid-svg-icons/faHeart";
import { TouchableHighlight } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Dimensions } from "react-native";
import { Pressable } from "react-native";

function RestaurantsCard({ value, navigation }) {
  const [liked, setLiked] = useState([]);

  const screenWidth = Dimensions.get("window").width;

  const handleLike = (_id) => {
    if (liked.includes(_id)) {
      setLiked(
        liked.filter((val) => {
          val !== _id;
        })
      );
    } else {
      setLiked((prev) => [...prev, _id]);
    }
  };

  const handleRestaurantChange = () => {
    navigation.navigate("restaurant-details", {
      restaurantDetails: value,
    });
  };

  return (
    <Pressable style={styles.card} onPress={() => handleRestaurantChange()}>
      <View style={styles.cardImageView}>
        <Image style={styles.cardImg} src={value.img} />
        <TouchableHighlight
          style={styles.imageLikeButton}
          onPress={() => handleLike(value._id)}
          hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
        >
          <FontAwesomeIcon
            style={styles.imageLikeButtonImg}
            icon={liked.includes(value._id) ? faHeartS : faHeart}
          />
        </TouchableHighlight>
      </View>
      <Text style={styles.cardTitle}>{value?.name}</Text>
      <View style={styles.cardInfo}>
        <FontAwesomeIcon style={styles.cardRatingIcon} icon={faStar} />
        <Text style={styles.cardTitle}>{value.rating}</Text>
      </View>
      <Text style={styles.cardTitle}>{value.cuisine}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginRight: 20,
  },
  cardImg: {
    borderRadius: 10,
    aspectRatio: 5 / 6,
    height: 170,
  },
  cardInfo: {
    flexDirection: "row",
  },
  cardTitle: {
    color: "#262626",
    fontWeight: "600",
    textAlign: "left",
  },
  cardRatingIcon: {
    color: "#28B463",
  },
  cardImageView: {
    position: "relative",
  },
  imageLikeButton: {
    position: "absolute",
    color: "#ffffff",
    right: 5,
    top: 5,
  },
  imageLikeButtonImg: {
    color: "#fff",
  },
});

export default RestaurantsCard;
