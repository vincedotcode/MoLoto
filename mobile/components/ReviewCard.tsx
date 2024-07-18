import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/Card";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import Row from "@/components/Row";

interface Review {
    _id: string;
    user_id: {
        _id: string;
        name: string;
        email: string;
    };
    car_id: string;
    rating: number;
    review: string;
    createdAt: string;
    updatedAt: string;
}

interface ReviewCardProps {
    review: Review;
    onDelete: () => void;
    showDeleteButton: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete, showDeleteButton }) => {
    return (
        <Card style={styles.card}>
            <CardHeader>
                <Row justifyBetween alignCenter>
                    <CardTitle style={styles.title}>{review.user_id.name}</CardTitle>
                    <>
                        {showDeleteButton && (
                            <Button variant="link" onPress={onDelete}>
                                <Ionicons name="trash" size={20} color="#ff0000" />
                            </Button>
                        )}
                    </>

                </Row>
            </CardHeader>
            <CardContent>
                <Text style={styles.reviewText}>{review.review}</Text>
                <Text style={styles.rating}>Rating: {review.rating}</Text>
                <Text style={styles.dateText}>
                    {new Date(review.createdAt).toLocaleDateString()} {new Date(review.createdAt).toLocaleTimeString()}
                </Text>
            </CardContent>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },
    reviewText: {
        fontSize: 16,
        color: "#555",
        marginVertical: 10
    },
    rating: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333"
    },
    dateText: {
        fontSize: 14,
        color: "#999"
    }
});

export default ReviewCard;
