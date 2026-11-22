import { Text } from 'react-native';
import { colors, fonts } from '../theme/theme';

const VARIANTES = {
  titulo: { fontFamily: fonts.titulo, fontSize: 28, color: colors.ink },
  secao: { fontFamily: fonts.negrito, fontSize: 17, color: colors.ink },
  corpo: { fontFamily: fonts.corpo, fontSize: 15, color: colors.ink },
  suave: { fontFamily: fonts.corpo, fontSize: 14, color: colors.muted },
  rotulo: { fontFamily: fonts.medio, fontSize: 12, color: colors.muted, letterSpacing: 0.5 },
};

export default function Txt({ v = 'corpo', style, ...props }) {
  return <Text {...props} style={[VARIANTES[v], style]} />;
}
