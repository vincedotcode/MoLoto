import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "@/components/Text";
import { getCommentsByCarId, Comment } from "@/services/comment";
import CommentCard from "@/components/CommentCard";
import { useAuth } from "@/hooks/useAuth";

interface CommentListProps {
  carId: string;
  newComment: boolean; // Add newComment prop to trigger re-fetch
  carSellerId: string; // Add the car seller ID as a prop
}

const CommentList: React.FC<CommentListProps> = ({ carId, newComment, carSellerId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByCarId(carId);
        const filteredComments = commentsData.filter(
          (comment) => 
            comment.is_public || 
            comment.user_id._id.toString() === user?._id.toString() || 
            user?._id.toString() === carSellerId.toString()
        );
        setComments(filteredComments);
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
  }, [carId, newComment, user?._id, carSellerId]);

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
        <CommentCard key={comment._id} comment={comment} carSellerId={carSellerId} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CommentList;
