import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { useStore } from '../../models/stores/root-store';
import styles from './image-detail.style';

interface ImageDetailProps {
  route: { params: { id: string } };
}

const ImageDetail: React.FC<ImageDetailProps> = ({ route }) => {
  const { id } = route.params;
  const { imageDetailStore } = useStore();
  const data = imageDetailStore.getImageDetails(id);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://live.staticflickr.com/${data?.server}/${data?.id}_${data?.secret}_z.jpg`,
          }}
          style={styles.image}
        />
        <Text style={styles.text}>{data?.title || '-'}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ImageDetail;
