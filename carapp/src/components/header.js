import React, { useState } from 'react';
import { Modal, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const faceIcon = require('../assets/face.png');

const CustomHeader = ({  }) => { 
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleProfilePress = () => {
    toggleModal();
    navigation.navigate('Profile'); 
  };

  const handleSettingsPress = () => {
    toggleModal();
    navigation.navigate('Settings'); 
  };

  const handleLogoutPress = () => {
    toggleModal();
    navigation.navigate('Main', { screen: 'Settings' });


  };

  return (
    <View style={styles.headerSection}>
      <TouchableOpacity onPress={toggleModal}>
        <Image
          source={faceIcon}
          resizeMode="contain"
          style={styles.faceIconStyle}
        />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={toggleModal}>
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={handleProfilePress}>
              <Text style={styles.dropdownItem}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSettingsPress}>
              <Text style={styles.dropdownItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogoutPress}>
              <Text style={styles.dropdownItem}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerSection: {
    height: 70,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: '#e7e7e7',
  },
  faceIconStyle: {
    width: 40,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 15,
  },
  dropdown: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
  },
});
