import React from "react";
import { View, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Card } from "./Card";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <View style={styles.cardContainer}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  scrollView: {
    width: Dimensions.get("window").width - 20,
    height: 200
  },
  image: {
    width: Dimensions.get("window").width - 20,
    height: 200,
    resizeMode: "cover"
  }
});

export default ImageSlider;
