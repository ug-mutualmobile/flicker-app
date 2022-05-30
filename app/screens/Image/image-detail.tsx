import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { UserImageDetailModel } from '../../models/store/image-detail-model';
import ResetStore from './components/reset-store';
import Styles from './image-detail.style';

const ImageDetail: React.FC = () => {
  const data = UserImageDetailModel.getImageDetails();

  useEffect(() => {
    return () => {
      ResetStore();
    };
  }, []);

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
