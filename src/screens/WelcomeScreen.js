import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Button from '../components/Button';
import { colors } from '../theme/theme';
import { PLANTAS } from '../utils/constantes';

const BENEFICIOS = [
  { icone: 'clock', titulo: 'Pausas offline', texto: 'Sessões de 15 minutos ou mais, no seu ritmo.' },
  { icone: 'star', titulo: 'Pontos e níveis', texto: 'Ganhe pontos e suba de nível a cada sessão.' },
  { icone: 'target', titulo: 'Desafios seus', texto: 'Crie metas pessoais para desconectar.' },
];

export default function WelcomeScreen({ navigation }) {
  return (
    <Screen scroll style={{ flexGrow: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 24 }}>
        <View style={{ width: 72, height: 72, borderRadius: 22, backgroundColor: colors.sageSoft, alignItems: 'center', justifyContent: 'center' }}>
          <Txt style={{ fontSize: 34 }}>🌿</Txt>
        </View>
        <Txt v="titulo" style={{ fontSize: 34, marginTop: 20 }}>Respiro</Txt>
        <Txt v="suave" style={{ marginTop: 6, fontSize: 16 }}>Menos tela, mais vida.</Txt>
      </View>

      <View style={{ alignItems: 'center', marginTop: 32 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {PLANTAS.map((planta, i) => (
            <View key={i} style={{ width: 56, height: 56, borderRadius: 18, backgroundColor: colors.sageSoft, alignItems: 'center', justifyContent: 'center' }}>
              <Txt style={{ fontSize: 18 + i * 5 }}>{planta}</Txt>
            </View>
          ))}
        </View>
        <Txt v="suave" style={{ marginTop: 14 }}>Cada pausa faz sua planta crescer.</Txt>
      </View>

      <View style={{ gap: 18, marginTop: 36 }}>
        {BENEFICIOS.map((b) => (
          <View key={b.titulo} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: colors.sageSoft, alignItems: 'center', justifyContent: 'center' }}>
              <Feather name={b.icone} size={20} color={colors.sage} />
            </View>
            <View style={{ flex: 1 }}>
              <Txt v="secao" style={{ fontSize: 15 }}>{b.titulo}</Txt>
              <Txt v="suave" style={{ marginTop: 2 }}>{b.texto}</Txt>
            </View>
          </View>
        ))}
      </View>

      <View style={{ flex: 1, minHeight: 32 }} />
      <View style={{ gap: 12 }}>
        <Button title="Começar" onPress={() => navigation.navigate('Login', { modo: 'registro' })} />
        <Button variant="secondary" title="Já tenho conta" onPress={() => navigation.navigate('Login', { modo: 'login' })} />
      </View>
    </Screen>
  );
}
