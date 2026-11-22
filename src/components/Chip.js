import { Pressable } from 'react-native';
import Txt from './Txt';
import { colors, fonts } from '../theme/theme';

export default function Chip({ label, selected, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={[{
        paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1,
        borderColor: selected ? colors.sage : colors.border,
        backgroundColor: selected ? colors.sage : colors.card,
      }, style]}
    >
      <Txt style={{ fontFamily: fonts.medio, color: selected ? '#fff' : colors.ink }}>{label}</Txt>
    </Pressable>
  );
}
