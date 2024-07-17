import { StyleSheet, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CenteredView from "@/components/CenteredView";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { Card } from "@/components/Card";

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CenteredView style={styles.container}>
        <Card style={styles.card}>
          <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Welcome to MoLoto</Text>
          <Text style={styles.subtitle}>Your ultimate car sales app</Text>
          <Text style={styles.description}>
            Easily buy and sell cars with our AI-driven platform. Get started by signing in!
          </Text>
          <Link href="/signin" asChild>
            <Button variant="default" size="lg" theme="light">
              Sign In
            </Button>
          </Link>
        </Card>
      </CenteredView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  card: {
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30
  },
  title: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10
  },
  subtitle: {
    fontFamily: "PoppinsRegular",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20
  },
  description: {
    fontFamily: "PoppinsLight",
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 40
  },
  signInButton: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    textAlign: "center"
  }
});

export default index;
