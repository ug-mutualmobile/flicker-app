import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import { ImageDetailInterface } from '../models/interfaces/image-detail-interface';
import { navigate } from '../navigators/root-navigation';
import STYLES from '../screens/home-screen/home-screen.style';

interface ImageCellProps {
  item: ImageDetailInterface;
}

const ImageCell: React.FC<ImageCellProps> = ({ item }) => {
  return (
    <Pressable
      style={STYLES.imageCellContainer}
      onPress={() => {
        navigate('ImageDetail', { id: item.id });
      }}>
      <Image
        source={{
          uri: `https://live.staticflickr.com/${item?.server}/${item?.id}_${item?.secret}_z.jpg`,
        }}
        style={STYLES.image}
      />
      <Text style={STYLES.text}>{item?.title || '-'}</Text>
    </Pressable>
  );
};

export default ImageCell;
