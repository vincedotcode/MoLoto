import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface CategoryButtonProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.button, selectedCategory === category && styles.selectedButton]}
            onPress={() => onSelectCategory(category)}
          >
            <Text style={[styles.buttonText, selectedCategory === category && styles.selectedButtonText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  scrollView: {
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5
  },
  selectedButton: {
    backgroundColor: "#000"
  },
  buttonText: {
    color: "#000"
  },
  selectedButtonText: {
    color: "#fff"
  }
});

export default CategoryButtons;
