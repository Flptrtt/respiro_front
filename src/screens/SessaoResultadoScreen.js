import { View } from 'react-native';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { colors, fonts } from '../theme/theme';
import { PLANTAS } from '../utils/constantes';

function Estatistica({ emoji, valor, rotulo }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Txt style={{ fontSize: 24 }}>{emoji}</Txt>
      <Txt style={{ fontFamily: fonts.titulo, fontSize: 20, marginTop: 6 }}>{valor}</Txt>
      <Txt v="suave" style={{ fontSize: 12 }}>{rotulo}</Txt>
    </View>
  );
}

export default function SessaoResultadoScreen({ navigation, route }) {
  const { resultado: r } = route.params;
  const { nivel } = r;
  const faltam = nivel.proximoPontos ? nivel.proximoPontos - r.pontosTotal : 0;

  return (
    <Screen style={{ alignItems: 'center' }}>
      <View style={{ width: 88, height: 88, borderRadius: 26, backgroundColor: colors.sageSoft, alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
        <Txt style={{ fontSize: 40 }}>{PLANTAS[nivel.numero - 1]}</Txt>
      </View>
      <Txt v="titulo" style={{ marginTop: 18 }}>Muito bem!</Txt>
      <Txt v="suave" style={{ marginTop: 6 }}>Você cresceu um pouco hoje.</Txt>

      <View style={{ flex: 1, justifyContent: 'center', width: '100%', gap: 12 }}>
        <Card style={{ flexDirection: 'row' }}>
          <Estatistica emoji="⏱️" valor={`${r.minutos} min`} rotulo="offline" />
          <Estatistica emoji="⭐" valor={`+${r.pontos}`} rotulo="pontos" />
          <Estatistica emoji="🔥" valor={`${r.sequencia} ${r.sequencia === 1 ? 'dia' : 'dias'}`} rotulo="sequência" />
        </Card>
        <Card>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Txt v="secao" style={{ fontSize: 15 }}>Progresso de nível</Txt>
            {nivel.proximoPontos && <Txt v="suave" style={{ fontSize: 12 }}>{r.pontosTotal} / {nivel.proximoPontos} pts</Txt>}
          </View>
          {nivel.proximoPontos ? (
            <>
              <ProgressBar value={r.pontosTotal / nivel.proximoPontos} color={colors.peach} />
              <Txt v="suave" style={{ fontSize: 12, marginTop: 8 }}>Mais {faltam} pontos para virar {nivel.proximoNome} {PLANTAS[nivel.numero]}</Txt>
            </>
          ) : (
            <Txt v="suave">Você chegou ao topo: uma árvore inteira 🌳</Txt>
          )}
        </Card>
      </View>

      <Button title="Voltar ao início" onPress={() => navigation.popToTop()} style={{ width: '100%' }} />
    </Screen>
  );
}
