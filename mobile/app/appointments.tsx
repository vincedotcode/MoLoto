import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet, SafeAreaView, Text } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { getAppointmentsBySellerId, getAppointmentsByBuyerId, Appointment, updateAppointmentStatus } from "@/services/appointment"; // Import appointment services
import AppointmentCardBuyer from "@/components/AppointmentCardBuyer";
import SuccessModal from "@/components/SuccessModal"; // Import the SuccessModal component

const Home: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");

    const { user } = useAuth();

    const fetchAppointments = async () => {
        try {
            if (user) {
                const appointmentsData = await getAppointmentsByBuyerId(user._id);
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

    const handleCancelAppointment = async (id: string) => {
        try {
            await updateAppointmentStatus(id, { status: "cancelled" });
            setSuccessMessage("Appointment cancelled successfully!");
            setModalVisible(true);
            fetchAppointments(); // Refresh the appointments list
        } catch (error) {
            console.error("Failed to cancel appointment", error);
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
                    title: "My Appointments"
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                {appointments.length === 0 ? (
                    <Text style={styles.noDataText}>No appointments available</Text>
                ) : (
                    appointments.map((appointment) => (
                        <AppointmentCardBuyer
                            key={appointment._id}
                            appointment={appointment}
                            onCancel={handleCancelAppointment}
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

export default Home;
