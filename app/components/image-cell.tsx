import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import { SearchResultInterface } from '../models/interfaces/search-result-interface';
import { UserImageDetailModel } from '../models/store/image-detail-model';
import { navigate } from '../navigators/root-navigation';
import STYLES from '../screens/Home/home-screen.style';

interface ImageCellProps {
  item: SearchResultInterface;
}

const ImageCell: React.FC<ImageCellProps> = ({ item }) => {
  return (
    <Pressable
      style={STYLES.imageCellContainer}
      onPress={() => {
        navigate('ImageDetail');
        UserImageDetailModel.setImageDetails(item);
      }}>
      <Image
        source={{
          uri: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_z.jpg`,
        }}
        style={STYLES.image}
      />
      <Text style={STYLES.text}>{item?.title}</Text>
    </Pressable>
  );
};

export default ImageCell;
