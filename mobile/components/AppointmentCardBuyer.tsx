import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { Appointment } from "@/services/appointment";

interface AppointmentCardBuyerProps {
  appointment: Appointment;
  onCancel: (id: string) => void;
}

const AppointmentCardBuyer: React.FC<AppointmentCardBuyerProps> = ({ appointment, onCancel }) => {
  return (
    <Card>
      <CardHeader>
        <View style={styles.headerContainer}>
          <CardTitle>Appointment with {appointment.seller_id.name}</CardTitle>
          <Badge variant={appointment.status === "cancelled" ? "destructive" : "default"} style={styles.badge}>
            {appointment.status}
          </Badge>
        </View>
      </CardHeader>
      <CardContent>
        <Text style={styles.detail}>Email: {appointment.seller_id.email}</Text>
        <Text style={styles.detail}>Phone: {appointment.seller_id.phone_number}</Text>
        <Text style={styles.detail}>Address: {appointment.seller_id.address}</Text>
        <View style={styles.separator} />
        <Text style={styles.detail}>Appointment Date: {new Date(appointment.appointment_date).toLocaleDateString()}</Text>
        <Text style={styles.detail}>Description: {appointment.description}</Text>
        {appointment.car_id && (
          <>
            <View style={styles.separator} />
            <Text style={styles.detail}>Car Make: {appointment.car_id.make}</Text>
            <Text style={styles.detail}>Car Model: {appointment.car_id.model}</Text>
            <Text style={styles.detail}>Car Year: {appointment.car_id.year}</Text>
          </>
        )}
      </CardContent>
      <CardFooter>
        {(appointment.status !== "cancelled" && appointment.status !== "sold" && appointment.status !== "completed") && (
          <Button variant="destructive" onPress={() => onCancel(appointment._id)} style={styles.cancelButton}>
            Cancel Appointment
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  detail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  cancelButton: {
    backgroundColor: "#FF0000",
  },
});

export default AppointmentCardBuyer;
