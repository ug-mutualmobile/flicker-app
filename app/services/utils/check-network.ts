import NetInfo from '@react-native-community/netinfo';

const checkNetwork = async () => {
  return await NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};

export default checkNetwork;
