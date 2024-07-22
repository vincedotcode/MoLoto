import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/Card";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { WishlistItem } from "@/services/wishlist";
import { removeFromWishlist } from "@/services/wishlist";
import { useAuth } from "@/hooks/useAuth";

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (id: string) => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item, onRemove }) => {
  const handleRemove = async () => {
    try {
      await removeFromWishlist(item._id);
      onRemove(item._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>{`${item.car_id.make} ${item.car_id.model}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <Text>Year: {item.car_id.year}</Text>
        <Text>Price: Rs{item.car_id.price}</Text>
      </CardContent>
      <CardFooter>
        <Button onPress={handleRemove}>Remove</Button>
      </CardFooter>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10
  }
});

export default WishlistCard;
