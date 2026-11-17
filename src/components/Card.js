import { View } from 'react-native';
import { colors, radius } from '../theme/theme';

export default function Card({ children, style }) {
  return (
    <View style={[{ backgroundColor: colors.card, borderRadius: radius.card, padding: 18, borderWidth: 1, borderColor: colors.border }, style]}>
      {children}
    </View>
  );
}
