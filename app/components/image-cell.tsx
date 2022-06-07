import React from 'react';
import { Image, Pressable, Text } from 'react-native';
// import { useStore } from '../models/stores/root-store';
import { navigate } from '../navigators/root-navigation';
import STYLES from '../screens/Home/home-screen.style';

interface ImageCellProps {
  item: any;
}

const ImageCell: React.FC<ImageCellProps> = ({ item }) => {
  // const { imageDetailStore } = useStore();
  return (
    <Pressable
      style={STYLES.imageCellContainer}
      onPress={() => {
        navigate('ImageDetail');
        // imageDetailStore.setImageId(item.id);
      }}>
      <Image
        source={{
          uri: `https://live.staticflickr.com/${item?.server}/${item.id}_${item.secret}_z.jpg`,
        }}
        style={STYLES.image}
      />
      <Text style={STYLES.text}>{item?.title}</Text>
    </Pressable>
  );
};

export default ImageCell;
