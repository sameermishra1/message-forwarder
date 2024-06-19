import React from 'react';
import {TouchableOpacity, Text, StyleProp, ViewStyle} from 'react-native';
import styles from './styles';

interface ButtonProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({label, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
