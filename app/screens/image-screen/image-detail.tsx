import React from 'react';
import { Image, Text, View } from 'react-native';
import Screen from '../../components/screen';
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
    <Screen>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://live.staticflickr.com/${data?.server}/${data?.id}_${data?.secret}_z.jpg`,
          }}
          style={styles.image}
        />
        <Text style={styles.text}>{data?.title || '-'}</Text>
      </View>
    </Screen>
  );
};

export default ImageDetail;
