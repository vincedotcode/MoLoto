import React, { useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { login } from "@/services/auth";
import { Link, router } from "expo-router";
import SuccessModal from "@/components/SuccessModal";
import FailureModal from "@/components/FailureModal";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login({
        email,
        password
      });
      setSuccess(true);
      setTimeout(() => {
        router.replace("/home");
      }, 2000);
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
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to log in</CardDescription>
          </CardHeader>
          <CardContent>
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
              secureTextEntry={showPassword}
            />
          </CardContent>
          <CardFooter>
            <Button variant="default" onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator size="small" color="#fff" /> : "Sign In"}
            </Button>
          </CardFooter>
        </Card>
        <View style={styles.signupLinkContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Link href="/signup" style={styles.signupLink}>
            Sign Up
          </Link>
        </View>
      </ScrollView>
      <SuccessModal
        visible={success}
        onClose={() => setSuccess(false)}
        title="Success"
        message="Logged in successfully!"
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
  signupLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  signupText: {
    fontSize: 16,
    color: "#333"
  },
  signupLink: {
    marginLeft: 5,
    fontSize: 16,
    color: "blue"
  }
});

export default SignIn;
