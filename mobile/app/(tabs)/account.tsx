import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, CardContent } from "@/components/Card";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import { useAuth } from "@/hooks/useAuth"; // Import useAuth hook

const Account = () => {
  const router = useRouter(); // Initialize the router
  const { user } = useAuth(); // Get the user data

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>   
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.touchableCard} onPress={() =>  router.push("/profile")}>
            <Card style={styles.profileCard}>
              <CardContent style={styles.cardContent}>
                <Ionicons name="person-outline" size={24} color="#fff" />
                <Text style={styles.profileTitle}>My Profile</Text>
              </CardContent>
              <CardContent style={styles.cardContent}>
                <Text style={styles.cardTextProfile}>View Profile</Text>
              </CardContent>
            </Card>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => router.push("/listing")} // Navigate to the listings page
          >
            <Card style={styles.widgetCard}>
              <CardContent style={styles.cardContent}>
                <Ionicons name="list-outline" size={24} color="#007bff" />
                <Text style={styles.cardTitle}>My Listings</Text>
              </CardContent>
              <CardContent style={styles.cardContent}>
                <Text style={styles.cardText}>View Listings</Text>
              </CardContent>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => router.push("/appointments")} // Navigate to the appointments page
          >
            <Card style={styles.widgetCard}>
              <CardContent style={styles.cardContent}>
                <Ionicons name="calendar-outline" size={24} color="#007bff" />
                <Text style={styles.cardTitle}>Appointments</Text>
              </CardContent>
              <CardContent style={styles.cardContent}>
                <Text style={styles.cardText}>View Appointments</Text>
              </CardContent>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => router.push("/wishlist")} // Navigate to the appointments page
          >
            <Card style={styles.widgetCard}>
              <CardContent style={styles.cardContent}>
                <Ionicons name="heart-outline" size={24} color="#007bff" />
                <Text style={styles.cardTitle}>My Wishlists</Text>
              </CardContent>
              <CardContent style={styles.cardContent}>
                <Text style={styles.cardText}>View Wishlists</Text>
              </CardContent>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => router.push("/MyCar")} // Navigate to the listings page
          >
            <Card style={styles.widgetCard}>
              <CardContent style={styles.cardContent}>
                <Ionicons name="car-outline" size={24} color="#007bff" />
                <Text style={styles.cardTitle}>My Cars</Text>
              </CardContent>
              <CardContent style={styles.cardContent}>
                <Text style={styles.cardText}>View Cars</Text>
              </CardContent>
            </Card>
          </TouchableOpacity>
        </View>
        {user?.role === "seller" && (
          <TouchableOpacity
            style={styles.fullWidthCardContainer}
            onPress={() => router.push("/car/appointments")} // Navigate to the appointments page
      
          >
            <Card style={styles.fullWidthWidgetCard}>
              <CardContent style={styles.cardContent}>
                <Ionicons name="calendar-outline" size={24} color="#007bff" />
                <Text style={styles.cardTitle}>My Car Appointments</Text>
              </CardContent>
              <CardContent style={styles.cardContent}>
                <Text style={styles.cardText}>View Car Appointments</Text>
              </CardContent>
            </Card>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  cardText: {
    fontSize: 16,
    color: "#007bff",
    marginTop: 10,
  },
  cardTextProfile: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  widgetCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  fullWidthWidgetCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: "100%",
  },
  touchableCard: {
    width: "100%",
    marginBottom: 10,
  },
  fullWidthCardContainer: {
    width: "100%",
    marginBottom: 10,
  },
  profileContainer: {
    marginTop: 20,
    width: "100%",
  },
  profileCard: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
});

export default Account;
