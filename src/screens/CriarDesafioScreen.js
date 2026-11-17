import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Input from '../components/Input';
import Button from '../components/Button';
import BotaoVoltar from '../components/BotaoVoltar';
import { api } from '../api/client';
import { colors, fonts, radius } from '../theme/theme';

const DURACOES = [{ rotulo: '1 semana', dias: 7 }, { rotulo: '2 semanas', dias: 14 }];
const METAS = [
  { rotulo: '30 min offline', desc: 'Uma pausa leve todos os dias', min: 30 },
  { rotulo: '1 hora offline', desc: 'Mais tempo para você', min: 60 },
];

function Opcao({ ativo, onPress, children, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={[{
        padding: 16, borderRadius: radius.campo, borderWidth: 1,
        borderColor: ativo ? colors.sage : colors.border, backgroundColor: ativo ? colors.sageSoft : colors.card,
      }, style]}
    >
      {children}
    </Pressable>
  );
}

export default function CriarDesafioScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [dias, setDias] = useState(null);
  const [min, setMin] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function criar() {
    setSalvando(true);
    setErro('');
    try {
      await api.criarDesafio({ nome, duracaoDias: dias, metaDiariaMin: min });
      navigation.goBack();
    } catch (e) {
      setErro(e.message);
      setSalvando(false);
    }
  }

  return (
    <Screen scroll style={{ flexGrow: 1 }}>
      <BotaoVoltar onPress={() => navigation.goBack()} />
      <Txt v="titulo">Criar desafio</Txt>
      <Txt v="suave" style={{ marginTop: 6, marginBottom: 24 }}>Defina uma meta pessoal para desconectar no seu ritmo.</Txt>

      <Txt v="corpo" style={{ fontFamily: fonts.medio, marginBottom: 8 }}>Nome do desafio</Txt>
      <Input placeholder="Ex: Semana sem redes sociais" value={nome} onChangeText={setNome} autoCapitalize="sentences" maxLength={40} />

      <Txt v="corpo" style={{ fontFamily: fonts.medio, marginTop: 24, marginBottom: 8 }}>Duração</Txt>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {DURACOES.map((d) => (
          <Opcao key={d.dias} ativo={dias === d.dias} onPress={() => setDias(d.dias)} style={{ flex: 1, alignItems: 'center' }}>
            <Txt v="secao" style={{ fontSize: 15 }}>{d.rotulo}</Txt>
          </Opcao>
        ))}
      </View>

      <Txt v="corpo" style={{ fontFamily: fonts.medio, marginTop: 24, marginBottom: 8 }}>Meta diária</Txt>
      <View style={{ gap: 12 }}>
        {METAS.map((m) => (
          <Opcao key={m.min} ativo={min === m.min} onPress={() => setMin(m.min)}>
            <Txt v="secao" style={{ fontSize: 15 }}>{m.rotulo}</Txt>
            <Txt v="suave" style={{ marginTop: 2 }}>{m.desc}</Txt>
          </Opcao>
        ))}
      </View>

      {!!erro && <Txt v="suave" style={{ marginTop: 16, color: colors.ink }}>{erro}</Txt>}
      <View style={{ flex: 1, minHeight: 32 }} />
      <Button title="Criar desafio" onPress={criar} loading={salvando} disabled={!nome.trim() || !dias || !min} />
    </Screen>
  );
}
