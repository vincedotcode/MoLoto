import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert, TextInput, Text, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { addCar } from '@/services/car';
import { useAuth } from "@/hooks/useAuth";
import AntDesign from '@expo/vector-icons/AntDesign';

interface AddCarData {
  seller_id: string;
  buyer_id?: string;
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  engine_type: string;
  fuel_efficiency: string;
  transmission_type: string;
  fuel_type: string;
  has_never_been_in_accident: boolean;
  insurance_number: string;
  car_number: string;
  description: string;
  image_urls: string[];
  is_sold: boolean;
  status: string;
  car_type: string;
}

interface AddCarProps {
  onAddCarSuccess: () => void;
}

const AddCar: React.FC<AddCarProps> = ({ onAddCarSuccess }) => {
  const { user } = useAuth();

  const [car, setCar] = useState<AddCarData>({
    seller_id: user?._id || '', // Initialize with an empty string if user is null
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    engine_type: '',
    fuel_efficiency: '',
    transmission_type: 'automatic',
    fuel_type: 'petrol',
    has_never_been_in_accident: false,
    insurance_number: '',
    car_number: '',
    description: '',
    image_urls: [],
    is_sold: false,
    status: 'available',
    car_type: 'sedan',
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');


  const handleInputChange = (name: string, value: any) => {
    setCar({ ...car, [name]: value });
  };

  const handleAddCar = async () => {
    setLoading(true);
    try {
      await addCar({
        ...car,
        year: Number(car.year),
        price: Number(car.price),
        mileage: Number(car.mileage),
        fuel_efficiency: Number(car.fuel_efficiency),
      });
      onAddCarSuccess(); // Call success handler
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesChange = () => {
    if (imageUrl && car.image_urls.length < 5) {
      setCar({ ...car, image_urls: [...car.image_urls, imageUrl] });
      setImageUrl('');
    } else {
      Alert.alert('Error', 'You can only add up to 5 images');
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = car.image_urls.filter((_, i) => i !== index);
    setCar({ ...car, image_urls: updatedImages });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  pickerContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  imageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  imageUrlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  imageUrl: {
    color: '#000',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
};

export default AddCar;
