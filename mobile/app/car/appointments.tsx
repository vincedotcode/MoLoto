import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet, SafeAreaView, Text } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { getAppointmentsBySellerId, Appointment, updateAppointmentStatus } from "@/services/appointment"; // Import appointment services
import AppointmentCardSeller from "@/components/AppointmentCardSeller"; // Import AppointmentCardSeller
import SuccessModal from "@/components/SuccessModal"; // Import the SuccessModal component
import FailureModal from "@/components/FailureModal"; // Import the FailureModal component if you have it

const MyCarAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [failureModalVisible, setFailureModalVisible] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [failureMessage, setFailureMessage] = useState<string>("");

    const { user } = useAuth();

    const fetchAppointments = async () => {
        try {
            if (user) {
                const appointmentsData = await getAppointmentsBySellerId(user._id);
                setAppointments(appointmentsData);
            }
        } catch (error) {
            if (error instanceof Error) {
                const err = JSON.parse(error.message);
                setError(err.message.join("\n"));
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [user]);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await updateAppointmentStatus(id, { status });
            setSuccessMessage("Appointment status updated successfully!");
            setModalVisible(true);
            fetchAppointments(); // Refresh the appointments list
        } catch (error) {
            setFailureMessage("Failed to update appointment status.");
            setFailureModalVisible(true);
            console.error("Failed to update appointment status", error);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: "My Car Appointments"
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                {appointments.length === 0 ? (
                    <Text style={styles.noDataText}>No appointments available</Text>
                ) : (
                    appointments.map((appointment) => (
                        <AppointmentCardSeller
                            key={appointment._id}
                            appointment={appointment}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ))
                )}
            </ScrollView>

            {/* Success Modal */}
            <SuccessModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Success"
                message={successMessage}
            />

            {/* Failure Modal */}
            <FailureModal
                visible={failureModalVisible}
                onClose={() => setFailureModalVisible(false)}
                title="Error"
                message={failureMessage}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    noDataText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 18,
        color: "#888",
    },
});

export default MyCarAppointments;
