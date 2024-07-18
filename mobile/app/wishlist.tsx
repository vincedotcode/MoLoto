import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { Text } from "@/components/Text";
import { getWishlistByUserId, WishlistItem } from "@/services/wishlist";
import WishlistCard from "@/components/WishlistCard";
import { useAuth } from "@/hooks/useAuth";

const WishlistPage: React.FC = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (user) {
          const wishlistData = await getWishlistByUserId(user._id);
          setWishlist(wishlistData);
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

    fetchWishlist();
  }, [user]);

  const handleRemove = (id: string) => {
    setWishlist(wishlist.filter(item => item._id !== id));
  };

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

  if (wishlist.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No items in wishlist</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {wishlist.map(item => (
        <WishlistCard key={item._id} item={item} onRemove={handleRemove} />
      ))}
    </ScrollView>
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
  }
});

export default WishlistPage;
