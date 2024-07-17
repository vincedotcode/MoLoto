import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCarById, Car } from "@/services/car";
import { Text } from "@/components/Text";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Row from "@/components/Row";
import ImageSlider from "@/components/ImageSlider";
import CommentList from "@/components/CommentList";
import { useLocalSearchParams, useRouter, Link, Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { addComment } from "@/services/comment";
import Checkbox from "@/components/Checkbox";
import { Ionicons } from "@expo/vector-icons";

const CarDetail: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [comment, setComment] = useState<string>("");
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<boolean>(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(id as any);
        setCar(carData);
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

    fetchCar();
  }, [id]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    setCommentLoading(true);
    try {
      await addComment({
        user_id: user?._id ?? "", // Using optional chaining and nullish coalescing
        car_id: car?._id ?? "",
        comment,
        is_public: !isPrivate
      });
      setComment(""); // Clear the comment input
      setIsPrivate(false); // Reset the private checkbox
      setNewComment(!newComment); // Toggle the newComment state to trigger a refresh
    } catch (error) {
      console.error(error);
    } finally {
      setCommentLoading(false);
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

  if (!car) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>No car details available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "View Car",
          headerLeft: () => (
            <Link href={{ pathname: "/home" }}>
              <Ionicons name="chevron-back-outline" size={30} />
            </Link>
          )
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <ImageSlider images={car.image_urls} />
        <Card>
          <CardHeader>
            <Row justifyBetween alignCenter>
              <CardTitle style={styles.title}>{`${car.make} ${car.model}`}</CardTitle>
              <Badge variant={car.is_sold ? "destructive" : "default"}>{car.is_sold ? "Sold" : car.status}</Badge>
            </Row>
          </CardHeader>
          <CardContent>
            <CardDescription>{car.description}</CardDescription>
            <View style={styles.separator} />
            <Row justifyBetween style={styles.row}>
              <Text style={styles.detail}>Year: {car.year}</Text>
              <Text style={styles.detail}>Price: Rs {car.price.toLocaleString()}</Text>
            </Row>
            <View style={styles.separator} />
            <Row justifyBetween style={styles.row}>
              <Text style={styles.detail}>Mileage: {car.mileage} km</Text>
              <Text style={styles.detail}>Engine: {car.engine_type}</Text>
            </Row>
            <View style={styles.separator} />
            <Row justifyBetween style={styles.row}>
              <Text style={styles.detail}>Fuel Efficiency: {car.fuel_efficiency} km/l</Text>
              <Text style={styles.detail}>Transmission: {car.transmission_type}</Text>
            </Row>
            <View style={styles.separator} />
            <Row justifyBetween style={styles.row}>
              <Text style={styles.detail}>Fuel Type: {car.fuel_type}</Text>
              <Text style={styles.detail}>Insurance No: {car.insurance_number}</Text>
            </Row>
            <View style={styles.separator} />
            <Row justifyBetween style={styles.row}>
              <Text style={styles.detail}>Car Number: {car.car_number}</Text>
              <Text style={styles.detail}>Accident-Free: {car.has_never_been_in_accident ? "Yes" : "No"}</Text>
            </Row>
          </CardContent>
          <CardFooter>
            <Button variant="default">Book Appointment</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Seller Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={styles.detail}>Name: {car.seller_id.name}</Text>
            <View style={styles.separator} />
            <Text style={styles.detail}>Email: {car.seller_id.email}</Text>
            <View style={styles.separator} />
            <Text style={styles.detail}>Phone: {car.seller_id.phone_number}</Text>
            <View style={styles.separator} />
            <Text style={styles.detail}>Address: {car.seller_id.address}</Text>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <CommentList carId={car._id} newComment={newComment} />
            <View style={styles.addCommentContainer}>
              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Add a comment..."
                style={styles.commentInput}
              />
              <Checkbox value={isPrivate} onValueChange={setIsPrivate} />
              <Text style={styles.privateLabel}>Private</Text>
            </View>
            <Button variant="default" onPress={handleAddComment} disabled={commentLoading} style={styles.addButton}>
              {commentLoading ? <ActivityIndicator size="small" color="#fff" /> : "Send"}
            </Button>
          </CardContent>
        </Card>
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
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  row: {
    marginVertical: 5
  },
  detail: {
    fontSize: 16,
    color: "#555"
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  commentInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginRight: 10
  },
  privateLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555"
  },
  addButton: {
    width: "100%",
    marginTop: 10
  }
});

export default CarDetail;
