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
      <Card>
        <CardHeader>
          <CardTitle>Add Car</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Make"
            value={car.make}
            onChangeText={(text) => handleInputChange('make', text)}
          />
          <Input
            placeholder="Model"
            value={car.model}
            onChangeText={(text) => handleInputChange('model', text)}
          />
          <Input
            placeholder="Year"
            value={car.year}
            onChangeText={(text) => handleInputChange('year', text)}
            keyboardType="numeric"
          />
          <Input
            placeholder="Price"
            value={car.price}
            onChangeText={(text) => handleInputChange('price', text)}
            keyboardType="numeric"
          />
          <Input
            placeholder="Mileage"
            value={car.mileage}
            onChangeText={(text) => handleInputChange('mileage', text)}
            keyboardType="numeric"
          />
          <Input
            placeholder="Engine Type"
            value={car.engine_type}
            onChangeText={(text) => handleInputChange('engine_type', text)}
          />
          <Input
            placeholder="Fuel Efficiency"
            value={car.fuel_efficiency}
            onChangeText={(text) => handleInputChange('fuel_efficiency', text)}
            keyboardType="numeric"
          />
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('transmission_type', value)}
              items={[
                { label: 'Automatic', value: 'automatic' },
                { label: 'Manual', value: 'manual' },
                { label: 'Semi-Automatic', value: 'semi-automatic' },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: 'Select Transmission Type', value: null }}
              value={car.transmission_type}
            />
          </View>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('fuel_type', value)}
              items={[
                { label: 'Petrol', value: 'petrol' },
                { label: 'Diesel', value: 'diesel' },
                { label: 'Electric', value: 'electric' },
                { label: 'Hybrid', value: 'hybrid' },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: 'Select Fuel Type', value: null }}
              value={car.fuel_type}
            />
          </View>
          <Input
            placeholder="Insurance Number"
            value={car.insurance_number}
            onChangeText={(text) => handleInputChange('insurance_number', text)}
          />
          <Input
            placeholder="Car Number"
            value={car.car_number}
            onChangeText={(text) => handleInputChange('car_number', text)}
          />
          <Input
            placeholder="Description"
            value={car.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('car_type', value)}
              items={[
                { label: 'Sedan', value: 'sedan' },
                { label: 'Hatchback', value: 'hatchback' },
                { label: 'SUV', value: 'SUV' },
                { label: 'Coupé', value: 'coupé' },
                { label: 'Convertible', value: 'convertible' },
                { label: 'Wagon', value: 'wagon' },
                { label: 'Pickup', value: 'pickup' },
                { label: 'Minivan', value: 'minivan' },
                { label: 'Sports Car', value: 'sports car' },
                { label: 'Electric', value: 'electric' },
                { label: 'Hybrid', value: 'hybrid' },
                { label: 'Luxury', value: 'luxury' },
                { label: 'Off-Road', value: 'off-road' },
                { label: 'Other', value: 'other' },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: 'Select Car Type', value: null }}
              value={car.car_type}
            />
          </View>

          <View style={styles.imageInputContainer}>
            <TextInput
              style={styles.imageInput}
              placeholder="Image URL"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
            <Button onPress={handleImagesChange}>Add Image</Button>
          </View>
          {car.image_urls.map((url, index) => (
            <View key={index} style={styles.imageUrlContainer}>
              <Text style={styles.imageUrl}>{url}</Text>
              <TouchableOpacity onPress={() => handleRemoveImage(index)}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}

          <Button onPress={handleAddCar} disabled={loading}>
            {loading ? 'Adding...' : 'Add Car'}
          </Button>
        </CardContent>
      </Card>
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
