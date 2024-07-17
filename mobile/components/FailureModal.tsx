import React from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const FailureModal: React.FC<ModalProps> = ({ visible, onClose, title, message }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Ionicons name="close-circle-outline" size={64} color="red" />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10
  },
  modalText: {
    fontSize: 18,
    marginVertical: 10
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#DC2626",
    borderRadius: 5
  },
  closeButtonText: {
    color: "white",
    fontSize: 16
  }
});

export default FailureModal;
