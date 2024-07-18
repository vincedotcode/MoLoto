import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { getCarsByBuyerId, Car } from "@/services/car";
import CarListingCardNoButton from "@/components/CarListingCardNoButton"; // Import the new CarListingCard component
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                if (user) {
                    const carsData = await getCarsByBuyerId(user._id);
                    setCars(carsData);
                }
            } catch (error) {
                if (error instanceof Error) {
                    const err = JSON.parse(error.message);
                    setError(err.message.join("\n"));
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [user]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: "My Cars"
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                {cars.length === 0 ? (
                    <Text style={styles.noDataText}>No cars available</Text>
                ) : (
                    cars.map((car) => (
                        <CarListingCardNoButton key={car._id} car={car} />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    noDataText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 18,
        color: "#888"
    }
});

export default ProfilePage;
