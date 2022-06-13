import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './primary-button.style';

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onPress }) => {
  return (
    <Pressable style={styles.background} onPress={onPress}>
      <Text style={styles.title}>{text}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
