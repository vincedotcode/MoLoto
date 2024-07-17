import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/Card";
import { Text } from "@/components/Text";
import { getCommentsByCarId, Comment } from "@/services/comment";

interface CommentListProps {
  carId: string;
  newComment: boolean; // Add newComment prop to trigger re-fetch
}

const CommentList: React.FC<CommentListProps> = ({ carId, newComment }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByCarId(carId);
        setComments(commentsData.filter((comment) => comment.is_public)); // Filter public comments
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

    fetchComments();
  }, [carId, newComment]); // Re-fetch comments when newComment changes

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

  if (comments.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No comments available</Text>
      </View>
    );
  }

  return (
    <View>
      {comments.map((comment) => (
        <Card key={comment._id} style={styles.commentCard}>
          <CardHeader>
            <CardTitle>{comment.user_id.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>{comment.comment}</Text>
          </CardContent>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center"
  },
  commentCard: {
    marginBottom: 10
  }
});

export default CommentList;
