import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/Card";
import { Text } from "@/components/Text";
import Row from "@/components/Row";
import Badge from "@/components/Badge";
import { useAuth } from "@/hooks/useAuth";

interface Comment {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
  };
  car_id: string;
  comment: string;
  is_public: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CommentCardProps {
  comment: Comment;
  carSellerId: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, carSellerId }) => {
  const { user } = useAuth();

  const canViewPrivateComment = !comment.is_public && (user?._id === comment.user_id._id || user?._id === carSellerId);

  return (
    <Card style={styles.card}>
      <CardHeader>
        <Row justifyBetween alignCenter>
          <CardTitle style={styles.title}>{comment.user_id.name}</CardTitle>
          <>
          {!comment.is_public && canViewPrivateComment && <Badge variant="destructive">Private Comment</Badge>}

          </>
        </Row>
      </CardHeader>
      <CardContent>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <Text style={styles.dateText}>
          {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString()}
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
  commentText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10
  },
  dateText: {
    fontSize: 14,
    color: "#999"
  }
});

export default CommentCard;
