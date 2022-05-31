import Snackbar from 'react-native-snackbar';

const SnackbarCell = (Text: string) => {
  Snackbar.show({
    text: Text,
    duration: Snackbar.LENGTH_SHORT,
  });
};

export default SnackbarCell;
