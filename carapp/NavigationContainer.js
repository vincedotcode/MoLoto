// NavigationContainer.js

import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";

import HomeScreen from "./src/HomeScreen";
import MapScreen from "./src/MapScreen";
import SettingsScreen from "./src/SettingsScreen";
import SavedScreen from "./src/SavedScreen";
import InfoScreen from "./src/InfoScreen";
import LoginScreen from "./src/LoginScreen";
import RegisterScreen from "./src/RegisterScreen"; // Assuming you have a Register screen

const homeIcon_active = require("./src/assets/icons/home-active.png");
const homeIcon = require("./src/assets/icons/home.png");
const compass_active = require("./src/assets/icons/compass-active.png");
const compass = require("./src/assets/icons/compass.png");
const savedIcon_active = require("./src/assets/icons/saved-active.png");
const savedIcon = require("./src/assets/icons/saved.png");
const settingsIcon_active = require("./src/assets/icons/settings-active.png");
const settingsIcon = require("./src/assets/icons/settings.png");

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


import CustomHeader from './src/components/header';


function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: () => <CustomHeader />, 
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* Add other auth related screens here */}
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "HomeStack") {
            iconName = focused ? homeIcon_active : homeIcon;
          } else if (route.name === "Map") {
            iconName = focused ? compass_active : compass;
          } else if (route.name === "Saved") {
            iconName = focused ? savedIcon_active : savedIcon;
          } else if (route.name === "Settings") {
            iconName = focused ? settingsIcon_active : settingsIcon;
          }

          return <Image source={iconName} resizeMode="contain" style={{ width: 25 }} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          padding: 10,
          backgroundColor: 'black',
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
        }
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ animationEnabled: false, headerShown: false }}
      />
    </Stack.Navigator>
  );
}
