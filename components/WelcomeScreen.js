import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { useFonts } from "expo-font";

const WelcomeScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    Dancing: require("../assets/fonts/DancingScript-Bold.ttf"),
    Ananda: require("../assets/fonts/AnandaNamasteRegular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  setTimeout(() => {
    navigation.navigate("home");
  }, 2000);

  return (
    <View style={styles.container}>
      <View style={styles.innerDiv}>
        <Image
          style={styles.logo}
          source={require("../assets/logo_main.png")}
        />
        <Text style={styles.headerTextTwo}>VeganBite </Text>
        {/* <Pressable>
          <Ionicons
            style={styles.icon}
            name="ios-chevron-forward-circle-outline"
            size={30}
            color="#f5f5f5"
            onPress={() => navigation.navigate("login")}
          />
        </Pressable> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    display: "flex",
    alignSelf: "center",
  },
  logo: {
    alignSelf: "center",
  },
  headerTextOne: {
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 250,
    paddingBottom: 10,
    fontSize: 100,
    color: "#f5f5f5",
    textAlign: "center",
    fontFamily: "Ananda",
    marginLeft: -20,
  },
  headerTextTwo: {
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 28,
    color: "#262626",
    textAlign: "center",
    fontFamily: "Dancing",
    marginLeft: -20,
  },
  innerDiv: {
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#3199a3",
  },
});

export default WelcomeScreen;
