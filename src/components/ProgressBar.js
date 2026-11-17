import { View } from 'react-native';
import { colors } from '../theme/theme';

/** value de 0 a 1 */
export default function ProgressBar({ value, color = colors.sage, style }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={[{ height: 8, borderRadius: 4, backgroundColor: colors.track, overflow: 'hidden' }, style]}>
      <View style={{ width: `${pct}%`, height: '100%', borderRadius: 4, backgroundColor: color }} />
    </View>
  );
}
