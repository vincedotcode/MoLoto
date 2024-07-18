// Widget.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

interface WidgetProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Widget: React.FC<WidgetProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.widget, style]} onPress={onPress}>
      <Text style={[styles.widgetText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  widget: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  widgetText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Widget;
