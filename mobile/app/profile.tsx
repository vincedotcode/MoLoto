import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator, Text } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { getUserById } from "@/services/auth"; // Import the service to get user by ID
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import Badge from "@/components/Badge";
import Colors from "@/constants/Colors";

const ViewProfile: React.FC = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(user);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id) {
        try {
          const fetchedUser = await getUserById(user._id);
          setUserData(fetchedUser);
        } catch (error) {
          setError("Failed to fetch user data.");
        } finally {
          setFetching(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (loading || fetching) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
  );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{userData?.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{userData?.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone Number:</Text>
              <Text style={styles.value}>{userData?.phone_number}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{userData?.address}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Role:</Text>
              <Badge variant={userData?.role === "admin" ? "destructive" : userData?.role === "seller" ? "secondary" : "default"}>
                {userData?.role}
              </Badge>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: Colors.dark.secondary,
  },
});

export default ViewProfile;
