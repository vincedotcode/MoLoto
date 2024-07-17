import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/Card";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button"; // Adjust the import path as needed
import { Text } from "@/components/Text"; // Adjust the import path as needed
import { register } from "@/services/auth"; // Import the register service
import SuccessModal from "@/components/SuccessModal";
import FailureModal from "@/components/FailureModal";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await register({
        name,
        email,
        password,
        phone_number: phoneNumber,
        address,
        role: isSeller ? "seller" : "buyer"
      });
      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        const err = JSON.parse(error.message);
        setErrorMessage(err.message.join("\n"));
        setFailure(true);
      } else {
        setErrorMessage("An unexpected error occurred");
        setFailure(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Fill in the details to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <Input value={name} onChangeText={setName} label="Name" placeholder="Enter your name" />
            <Input
              value={email}
              onChangeText={setEmail}
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <Input
              value={password}
              onChangeText={setPassword}
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
            />
            <Input
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              label="Phone Number"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            <Input value={address} onChangeText={setAddress} label="Address" placeholder="Enter your address" />
            <View style={styles.checkboxContainer}>
              <Checkbox value={isSeller} onValueChange={setIsSeller} />
              <Text style={styles.checkboxLabel}>Do you want to sell your car?</Text>
            </View>
          </CardContent>
          <CardFooter>
            <Button variant="default" onPress={handleSignUp} disabled={loading}>
              {loading ? <ActivityIndicator size="small" color="#fff" /> : "Sign Up"}
            </Button>
          </CardFooter>
        </Card>
      </ScrollView>
      <SuccessModal
        visible={success}
        onClose={() => setSuccess(false)}
        title="Success"
        message="Account created successfully!"
      />
      <FailureModal visible={failure} onClose={() => setFailure(false)} title="Error" message={errorMessage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333"
  }
});

export default SignUp;
