import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Tabs, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "@/hooks/useAuth";

const TabsLayout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: "AI",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="robot-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle" color={color} />,
          headerRight: () => (
            <View style={styles.buttonStyle}>
              <Button onPress={handleLogout} title="Logout" color="#000" />
            </View>

          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },

  buttonStyle: {
   margin: 10,
  },
});

export default TabsLayout;
