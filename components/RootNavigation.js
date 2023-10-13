import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./WelcomeScreen";
// import Login from "./Login";
// import Profile from "./Profile";
// import Menu from "./Menu";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return <WelcomeScreen />;
};

export default RootNavigator;
