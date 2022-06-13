import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.warning,
  },
  desc: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
  },
});

export default styles;
