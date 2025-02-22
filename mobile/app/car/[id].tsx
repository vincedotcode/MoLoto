import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView, TextInput, Modal } from "react-native";
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
import { Ionicons } from "@expo/vector-icons";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import SuccessModal from "@/components/SuccessModal";
import FailureModal from "@/components/FailureModal";
import Checkbox from "@/components/Checkbox";
import { addAppointment as bookAppointment } from "@/services/appointment";
import { addToWishlist } from "@/services/wishlist";
import { createReview, getReviewsByCarId, deleteReview, Review } from "@/services/review";
import ReviewCard from "@/components/ReviewCard";

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

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [appointmentDate, setAppointmentDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [isAppointmentLoading, setIsAppointmentLoading] = useState<boolean>(false);

  const [isAddReviewModalVisible, setIsAddReviewModalVisible] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isReviewLoading, setIsReviewLoading] = useState<boolean>(false);

  const [isReviewModalVisible, setIsReviewModalVisible] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handleBookAppointment = async () => {
    setIsAppointmentLoading(true);
    try {
      // Make the API call to book the appointment here
      await bookAppointment({
        buyer_id: user?._id ?? "",
        seller_id: car?.seller_id._id ?? "",
        car_id: car?._id ?? "",
        appointment_date: appointmentDate,
        description,
        status: "scheduled"
      });
      setIsModalVisible(false);
      setSuccessMessage("Appointment booked successfully!");
      setIsSuccessModalVisible(true);
    } catch (error) {
      setErrorMessage("Failed to book appointment. Please try again.");
      setIsErrorModalVisible(true);
    } finally {
      setIsAppointmentLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    setLoading(true);
    try {
      await addToWishlist(user?._id ?? "", car?._id ?? "");
      setSuccessMessage("Car added to wishlist successfully!");
      setIsSuccessModalVisible(true);
    } catch (error) {
      setErrorMessage("Car is already in the wishlist");
      setIsErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    setIsReviewLoading(true);
    try {
      await createReview(user?._id ?? "", car?._id ?? "", rating, review);
      setIsAddReviewModalVisible(false);
      setSuccessMessage("Review added successfully!");
      setIsSuccessModalVisible(true);
    } catch (error) {
      setErrorMessage("Failed to add review. Please try again.");
      setIsErrorModalVisible(true);
    } finally {
      setIsReviewLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const reviewsData = await getReviewsByCarId(car?._id ?? "");
      setReviews(reviewsData);
      setIsReviewModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((review) => review._id !== reviewId));
      setSuccessMessage("Review deleted successfully!");
      setIsSuccessModalVisible(true);
    } catch (error) {
      setErrorMessage("Failed to delete review. Please try again.");
      setIsErrorModalVisible(true);
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
            <Button variant="default" onPress={() => setIsModalVisible(true)}>Book Appointment</Button>
            <Button variant="default" onPress={handleAddToWishlist} disabled={loading} style={styles.addButton}>
              {loading ? <ActivityIndicator size="small" color="#fff" /> : "Add to Wishlist"}
            </Button>
            <Button variant="default" onPress={() => setIsAddReviewModalVisible(true)} style={styles.addButton}>
              Add Review
            </Button>
            <Button variant="default" onPress={fetchReviews} style={styles.addButton}>
              View Reviews
            </Button>
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
            <CommentList carId={car._id} newComment={newComment} carSellerId={car.seller_id._id} />
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

      {/* Book Appointment Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book Appointment</Text>
            <Input
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
            />
            <DatePicker date={appointmentDate} onDateChange={setAppointmentDate} />
            <Button variant="default" onPress={handleBookAppointment} disabled={isAppointmentLoading}>
              {isAppointmentLoading ? <ActivityIndicator size="small" color="#fff" /> : "Book Appointment"}
            </Button>
            <Button variant="default" onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>

      {/* Add Review Modal */}
      <Modal visible={isAddReviewModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsAddReviewModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Review</Text>
            <Input
              label="Review"
              value={review}
              onChangeText={setReview}
              placeholder="Enter review"
            />
            <View style={styles.ratingContainer}>
              <Text>Rating:</Text>
              <View style={styles.ratingButtons}>
                <Button onPress={() => setRating(Math.max(0, rating - 1))} disabled={rating === 0}>
                  -
                </Button>
                <Text style={styles.rating}>{rating}</Text>
                <Button onPress={() => setRating(Math.min(5, rating + 1))} disabled={rating === 5}>
                  +
                </Button>
              </View>
            </View>
            <Button variant="default" onPress={handleAddReview} disabled={isReviewLoading}>
              {isReviewLoading ? <ActivityIndicator size="small" color="#fff" /> : "Submit Review"}
            </Button>
            <Button variant="default" onPress={() => setIsAddReviewModalVisible(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>

      {/* View Reviews Modal */}
      <Modal visible={isReviewModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsReviewModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentFixedHeight}>
            <Text style={styles.modalTitle}>Reviews</Text>
            <ScrollView style={styles.reviewScrollView}>
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onDelete={() => handleDeleteReview(review._id)}
                  showDeleteButton={review.user_id._id === user?._id}
                />
              ))}
            </ScrollView>
            <Button variant="default" onPress={() => setIsReviewModalVisible(false)} style={styles.closeButton}>
              Close
            </Button>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={() => setIsSuccessModalVisible(false)}
        title="Success"
        message={successMessage}
      />

      {/* Error Modal */}
      <FailureModal
        visible={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        title="Error"
        message={errorMessage}
      />
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center"
  },
  modalContentFixedHeight: {
    width: 300,
    height: 400,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  ratingButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10
  },
  rating: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  reviewScrollView: {
    flex: 1,
    width: "100%"
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#ABABAB"
  }
});

export default CarDetail;
