import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/theme';

/** progress de 0 a 1 */
export default function Ring({ size, stroke, progress, color = colors.sage, track = colors.sageSoft, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, progress));
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round" strokeDasharray={`${c}`} strokeDashoffset={c * (1 - p)}
          rotation="-90" origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {children}
    </View>
  );
}
