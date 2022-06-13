import { useNetInfo } from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import NoNetwork from './no-network/no-network';

interface ScreenProps {}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  const NetInfo = useNetInfo();
  const [isNetConnected, setIsNetConnected] = useState<boolean | null>(true);

  useEffect(() => {
    setIsNetConnected(NetInfo.isConnected);
  }, [NetInfo]);

  return (
    <SafeAreaView>
      {isNetConnected ? children : <NoNetwork onChange={setIsNetConnected} />}
    </SafeAreaView>
  );
};

export default Screen;
