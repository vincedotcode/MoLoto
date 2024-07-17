import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, ActivityIndicator, Alert, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '@/services/image';
import { Ionicons } from '@expo/vector-icons';

interface ImageUploaderProps {
  onImagesChange: (imageUrls: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      setLoading(true);
      try {
        const uploadedImageUrl = await uploadImage(uri);
        setImages((prevImages) => {
          const updatedImages = [...prevImages, uploadedImageUrl];
          onImagesChange(updatedImages);
          return updatedImages;
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteImage = (imageUri: string) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((img) => img !== imageUri);
      onImagesChange(updatedImages);
      return updatedImages;
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from gallery" onPress={handlePickImage} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={images}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
            <Ionicons name="trash" size={24} color="red" onPress={() => handleDeleteImage(item)} style={styles.deleteIcon} />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default ImageUploader;
