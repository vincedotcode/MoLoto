import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/Card";
import Badge from "@/components/Badge";
import { Appointment } from "@/services/appointment";

interface AppointmentCardSellerProps {
  appointment: Appointment;
  onUpdateStatus: (id: string, status: string) => void;
}

const AppointmentCardSeller: React.FC<AppointmentCardSellerProps> = ({ appointment, onUpdateStatus }) => {
  const [status, setStatus] = useState<string>(appointment.status);
  const [confirmationVisible, setConfirmationVisible] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>("");

  const handleStatusChange = (value: string) => {
    setNewStatus(value);
    setConfirmationVisible(true);
  };

  const confirmStatusChange = () => {
    setStatus(newStatus);
    onUpdateStatus(appointment._id, newStatus);
    setConfirmationVisible(false);
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "scheduled":
        return "default";
      case "completed":
        return "secondary";
      case "sold":
        return "destructive";
      case "cancelled":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <View style={styles.headerContainer}>
          <CardTitle>Appointment with {appointment.buyer_id.name}</CardTitle>
          <Badge variant={getBadgeVariant(status)} style={styles.badge}>
            {status}
          </Badge>
        </View>
      </CardHeader>
      <CardContent>
        <Text style={styles.detail}>Email: {appointment.buyer_id.email}</Text>
        <Text style={styles.detail}>Phone: {appointment.buyer_id.phone_number}</Text>
        <Text style={styles.detail}>Address: {appointment.buyer_id.address}</Text>
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
      {status !== "sold" && status !== "completed" && (
        <CardFooter>
          <RNPickerSelect
            onValueChange={(value) => handleStatusChange(value)}
            items={[
              { label: "Scheduled", value: "scheduled" },
              { label: "Completed", value: "completed" },
              { label: "Sold", value: "sold" },
              { label: "Cancelled", value: "cancelled" },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "Select Status", value: null }}
            value={status}
          />
        </CardFooter>
      )}
      <Modal
        visible={confirmationVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setConfirmationVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to change the status to "{newStatus}"?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmStatusChange}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setConfirmationVisible(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default AppointmentCardSeller;
