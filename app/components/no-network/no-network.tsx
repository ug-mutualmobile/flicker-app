import React from 'react';
import { Text, View } from 'react-native';
import checkNetwork from '../../services/utils/check-network';
import PrimaryButton from '../primary-button/primary-button';
import styles from './no-network.style';

interface NoNetworkProps {
  onChange: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const NoNetwork: React.FC<NoNetworkProps> = ({ onChange }) => {
  const checkForNetwork = async () => {
    onChange((await checkNetwork()).isConnected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Network!</Text>
      <Text style={styles.desc}>Check your network connection.</Text>
      <PrimaryButton onPress={checkForNetwork} text="Try Again" />
    </View>
  );
};

export default NoNetwork;
