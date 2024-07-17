import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import CarListingCard from "@/components/CarListingCard";
import CategoryButtons from "@/components/CategoryButtons"; // Adjust the import path as needed
import { getAllCars, Car } from "@/services/car";
import { useLocalSearchParams, useRouter, Link, Stack } from "expo-router";
const Home: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Sedan", "SUV", "Truck", "Coupe"]; // Example categories

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getAllCars();
        setCars(carsData);
        setFilteredCars(carsData); // Initially show all cars
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
  }, []);

  useEffect(() => {
    filterCarsByCategory(selectedCategory);
  }, [selectedCategory, cars]);

  const filterCarsByCategory = (category: string) => {
    if (category === "All") {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) => car.car_type.toLowerCase() === category.toLowerCase());
      setFilteredCars(filtered);
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
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
      <Stack.Screen
        options={{
          title: "Cars"
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Car Listings</Text>
        <CategoryButtons
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarListingCard key={car._id} car={car} />)
        ) : (
          <Text style={styles.noDataText}>No cars available for this category</Text>
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
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888"
  }
});

export default Home;
