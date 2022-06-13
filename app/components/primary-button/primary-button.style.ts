import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.primaryBackground,
    height: 40,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default styles;
