import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import { api } from '../api/client';
import { colors, fonts, radius } from '../theme/theme';

export default function SessaoConcluidaScreen({ navigation, route }) {
  const { minutos } = route.params;
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  async function responder(presente) {
    setEnviando(true);
    setErro('');
    try {
      const resultado = await api.finalizarSessao(minutos, presente);
      navigation.replace('SessaoResultado', { resultado });
    } catch (e) {
      setErro(e.message);
      setEnviando(false);
    }
  }

  const opcoes = [{ emoji: '✅', texto: 'Sim, fiquei presente', valor: true }, { emoji: '🌤️', texto: 'Mais ou menos', valor: false }];

  return (
    <Screen style={{ alignItems: 'center' }}>
      <Txt style={{ fontSize: 56, marginTop: 32 }}>🌿</Txt>
      <Txt v="titulo" style={{ marginTop: 16 }}>Sessão concluída!</Txt>
      <Txt v="suave" style={{ marginTop: 8 }}>{minutos} {minutos === 1 ? 'minuto' : 'minutos'} de descanso digital.</Txt>

      <View style={{ flex: 1, justifyContent: 'center', width: '100%', gap: 12 }}>
        <Txt v="secao" style={{ textAlign: 'center', marginBottom: 8 }}>Você ficou longe do celular de verdade?</Txt>
        {opcoes.map((o) => (
          <Pressable
            key={o.texto}
            disabled={enviando}
            onPress={() => responder(o.valor)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 18, borderRadius: radius.campo, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, opacity: enviando ? 0.5 : 1 }}
          >
            <Txt>{o.emoji}</Txt>
            <Txt style={{ fontFamily: fonts.negrito }}>{o.texto}</Txt>
          </Pressable>
        ))}
        {!!erro && <Txt v="suave" style={{ textAlign: 'center', color: colors.ink }}>{erro}</Txt>}
      </View>

      <Txt v="suave" style={{ fontSize: 12, textAlign: 'center' }}>Sua resposta é só sua — não aparece para ninguém.</Txt>
    </Screen>
  );
}
