import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle" color={color} />
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
