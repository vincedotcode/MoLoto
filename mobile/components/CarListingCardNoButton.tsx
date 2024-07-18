import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/Card";
import Badge from "@/components/Badge";
import Row from "@/components/Row";

interface CarProps {
  car: {
    _id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    engine_type: string;
    fuel_efficiency: number;
    transmission_type: string;
    fuel_type: string;
    image_urls: string[];
    is_sold: boolean;
    status: string;
  };
}

const CarListingCardNoButton: React.FC<CarProps> = ({ car }) => {
  return (
    <Card style={styles.card}>
      <CardHeader>
        <Row justifyBetween alignCenter>
          <CardTitle style={styles.title}>{`${car.make} ${car.model}`}</CardTitle>
          <Badge variant={car.is_sold ? "destructive" : "default"} style={styles.badge}>
            {car.is_sold ? "Sold" : car.status}
          </Badge>
        </Row>
      </CardHeader>
      <CardContent>
        <Image source={{ uri: car.image_urls[0] }} style={styles.image} />
        <CardDescription style={styles.description}>{`${car.year} - Rs ${car.price.toLocaleString()}`}</CardDescription>
        <View style={styles.detailsContainer}>
          <Row justifyBetween>
            <Text style={styles.detail}>Mileage: {car.mileage} km</Text>
            <Text style={styles.detail}>Engine: {car.engine_type}</Text>
          </Row>
          <Row justifyBetween>
            <Text style={styles.detail}>Fuel Efficiency: {car.fuel_efficiency} km/l</Text>
            <Text style={styles.detail}>Transmission: {car.transmission_type}</Text>
          </Row>
          <Row justifyBetween>
            <Text style={styles.detail}>Fuel Type: {car.fuel_type}</Text>
          </Row>
        </View>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  badge: {
    marginLeft: 10
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10
  },
  description: {
    marginBottom: 10
  },
  detailsContainer: {
    marginBottom: 10
  },
  detail: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555"
  }
});

export default CarListingCardNoButton;
