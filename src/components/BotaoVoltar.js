import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/theme';

export default function BotaoVoltar({ onPress }) {
  return (
    <Pressable onPress={onPress} hitSlop={12} style={{ alignSelf: 'flex-start', marginBottom: 16 }}>
      <Feather name="arrow-left" size={22} color={colors.ink} />
    </Pressable>
  );
}
