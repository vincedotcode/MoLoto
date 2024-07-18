import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Text } from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import CarListingCard from "@/components/CarListingCard";
import CategoryButtons from "@/components/CategoryButtons";
import { getAllCars, getCarsBySellerId, Car } from "@/services/car";
import { useLocalSearchParams, useRouter, Link, Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import AddCar from "@/components/AddCarForm"; 
import { Ionicons } from "@expo/vector-icons";

const Home: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State to control modal visibility

  const { user } = useAuth();
  const categories = ["All", "Sedan", "SUV", "Truck", "Coupe"];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (user && user._id) {
          const carsData = await getCarsBySellerId(user._id);
          setCars(carsData);
          setFilteredCars(carsData);
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

  const handleAddCarSuccess = async () => {
    setModalVisible(false);
    setLoading(true);
    try {
      if (user && user._id) {
        const carsData = await getCarsBySellerId(user._id);
        setCars(carsData);
        setFilteredCars(carsData);
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
          title: "My Listings"
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Car</Text>
        </TouchableOpacity>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
         
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <AddCar onAddCarSuccess={handleAddCarSuccess} /> {/* Pass the success handler */}
         
        </View>
      </Modal>
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
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});

export default Home;
