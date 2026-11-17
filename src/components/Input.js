import { TextInput } from 'react-native';
import { colors, fonts, radius } from '../theme/theme';

export default function Input(props) {
  return (
    <TextInput
      placeholderTextColor={colors.muted}
      autoCapitalize="none"
      {...props}
      style={[{
        height: 54, borderRadius: radius.campo, borderWidth: 1, borderColor: colors.border,
        backgroundColor: colors.card, paddingHorizontal: 18, fontFamily: fonts.corpo, fontSize: 15, color: colors.ink,
      }, props.style]}
    />
  );
}
