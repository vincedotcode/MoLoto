import React from "react";
import { ViewStyle, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const CheckIcon = () => (
  <Svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M20 6L9 17l-5-5" />
  </Svg>
);

interface CheckboxProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ value, onValueChange, style, disabled }) => {
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, value ? styles.checked : styles.unchecked, disabled && styles.disabled, style]}
      onPress={handlePress}
      disabled={disabled}
    >
      {value && <CheckIcon />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  checked: {
    backgroundColor: "#22C55E", // Primary color when checked
    borderColor: "#22C55E"
  },
  unchecked: {
    borderColor: "#E5E7EB" // Input color when unchecked
  },
  disabled: {
    opacity: 0.5
  }
});

export default Checkbox;
