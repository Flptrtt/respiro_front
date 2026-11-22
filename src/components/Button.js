import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import Txt from './Txt';
import { colors, fonts, radius } from '../theme/theme';

export default function Button({ title, onPress, variant = 'primary', disabled, loading, style, textColor }) {
  const primario = variant === 'primary';
  const corTexto = textColor || (primario ? '#fff' : colors.ink);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[s.base, primario ? s.primario : s.secundario, (disabled || loading) && { opacity: 0.45 }, style]}
    >
      {loading ? (
        <ActivityIndicator color={corTexto} />
      ) : (
        <Txt style={{ fontFamily: fonts.negrito, fontSize: 16, color: corTexto }}>{title}</Txt>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  base: { height: 54, borderRadius: radius.botao, alignItems: 'center', justifyContent: 'center' },
  primario: { backgroundColor: colors.peach },
  secundario: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
});
