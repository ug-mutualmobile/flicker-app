import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { useStore } from '../../models/stores/root-store';
import Styles from './image-detail.style';

const ImageDetail: React.FC = () => {
  const { imageDetailStore } = useStore();
  const data = imageDetailStore.getImageDetails();

  return (
    <SafeAreaView>
      <View style={Styles.container}>
        <Image
          source={{
            uri: `https://live.staticflickr.com/${data?.server}/${data?.id}_${data?.secret}_z.jpg`,
          }}
          style={Styles.image}
        />
        <Text style={Styles.text}>{data?.title || '-'}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ImageDetail;
