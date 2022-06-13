import NetInfo from '@react-native-community/netinfo';

const checkNetwork = async () => {
  return await NetInfo.fetch().then(state => {
    return {
      isConnected: state.isConnected,
      isInternetReachable: state.isInternetReachable,
    };
  });
};

export default checkNetwork;
