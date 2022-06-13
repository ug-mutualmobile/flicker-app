import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    padding: 10,
  },
  imageCellContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#d6d6d6',
  },
  image: {
    height: 80,
    width: 80,
    marginVertical: 12,
    backgroundColor: 'gray',
  },
  text: {
    marginLeft: 12,
    fontSize: 18,
    flex: 1,
    color: 'black',
  },
  list: { paddingBottom: Platform.OS === 'ios' ? 120 : 140 },
});

export default styles;
