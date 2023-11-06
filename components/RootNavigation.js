import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./WelcomeScreen";
import Home from "../Screens/Home";
import RestaurantDetails from "./RestaurantDetails/RestaurantDetails";
import Location from "./Location";
import Map from "./Map";

// import Login from "./Login";
// import Profile from "./Profile";
// import Menu from "./Menu";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "pop",
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Stack.Screen name="splash" component={WelcomeScreen} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="restaurant-details" component={RestaurantDetails} />
      <Stack.Screen name="location" component={Location} />
      <Stack.Screen name="map" component={Map} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
