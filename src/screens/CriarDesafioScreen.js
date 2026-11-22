import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Input from '../components/Input';
import Button from '../components/Button';
import Chip from '../components/Chip';
import BotaoVoltar from '../components/BotaoVoltar';
import { api } from '../api/client';
import { colors, fonts, radius } from '../theme/theme';
import { formatarMinutos } from '../utils/format';

const NIVEIS = [
  { rotulo: 'Fácil', desc: '15 min offline por dia. Um respiro leve.', min: 15 },
  { rotulo: 'Médio', desc: '1 hora offline por dia. Mais tempo para você.', min: 60 },
  { rotulo: 'Difícil', desc: '3 horas offline por dia. Para ir fundo.', min: 180 },
];
const UNIDADES = [
  { rotulo: 'Dias', dias: 1 },
  { rotulo: 'Semanas', dias: 7 },
  { rotulo: 'Meses', dias: 30 },
  { rotulo: 'Anos', dias: 365 },
];
const MAX_DIAS = 1825; // 5 anos

function Opcao({ ativo, onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16, borderRadius: radius.campo, borderWidth: 1,
        borderColor: ativo ? colors.sage : colors.border, backgroundColor: ativo ? colors.sageSoft : colors.card,
      }}
    >
      {children}
    </Pressable>
  );
}

export default function CriarDesafioScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState(60); // minutos por dia, ou 'custom'
  const [minCustom, setMinCustom] = useState('');
  const [quantidade, setQuantidade] = useState('2');
  const [unidade, setUnidade] = useState(7);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const metaMin = nivel === 'custom' ? parseInt(minCustom, 10) || 0 : nivel;
  const dias = (parseInt(quantidade, 10) || 0) * unidade;
  const metaOk = metaMin >= 5 && metaMin <= 720;
  const diasOk = dias >= 1 && dias <= MAX_DIAS;
  const valido = nome.trim().length > 0 && metaOk && diasOk;

  const aviso = !metaOk
    ? 'A meta diária vai de 5 minutos a 12 horas.'
    : dias > MAX_DIAS
      ? 'A duração máxima é de 5 anos.'
      : !diasOk
        ? 'Informe a duração do desafio.'
        : `Meta: ${formatarMinutos(metaMin)} offline por dia, durante ${dias} ${dias === 1 ? 'dia' : 'dias'}.`;

  async function criar() {
    setSalvando(true);
    setErro('');
    try {
      await api.criarDesafio({ nome, duracaoDias: dias, metaDiariaMin: metaMin });
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
      <Txt v="suave" style={{ marginTop: 6, marginBottom: 24 }}>Escolha o quanto quer se desafiar e por quanto tempo.</Txt>

      <Txt v="corpo" style={{ fontFamily: fonts.medio, marginBottom: 8 }}>Nome do desafio</Txt>
      <Input placeholder="Ex: Noites sem celular" value={nome} onChangeText={setNome} autoCapitalize="sentences" maxLength={40} />

      <Txt v="corpo" style={{ fontFamily: fonts.medio, marginTop: 24, marginBottom: 8 }}>Dificuldade</Txt>
      <View style={{ gap: 12 }}>
        {NIVEIS.map((n) => (
          <Opcao key={n.min} ativo={nivel === n.min} onPress={() => setNivel(n.min)}>
            <Txt v="secao" style={{ fontSize: 15 }}>{n.rotulo}</Txt>
            <Txt v="suave" style={{ marginTop: 2 }}>{n.desc}</Txt>
          </Opcao>
        ))}
        <Opcao ativo={nivel === 'custom'} onPress={() => setNivel('custom')}>
          <Txt v="secao" style={{ fontSize: 15 }}>Personalizado</Txt>
          <Txt v="suave" style={{ marginTop: 2 }}>Você escolhe os minutos por dia.</Txt>
        </Opcao>
        {nivel === 'custom' && (
          <Input placeholder="Minutos offline por dia (5 a 720)" keyboardType="number-pad" value={minCustom} onChangeText={setMinCustom} maxLength={3} />
        )}
      </View>

      <Txt v="corpo" style={{ fontFamily: fonts.medio, marginTop: 24, marginBottom: 8 }}>Duração</Txt>
      <Input placeholder="Quantidade" keyboardType="number-pad" value={quantidade} onChangeText={setQuantidade} maxLength={4} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
        {UNIDADES.map((u) => (
          <Chip key={u.dias} label={u.rotulo} selected={unidade === u.dias} onPress={() => setUnidade(u.dias)} />
        ))}
      </View>

      <Txt v="suave" style={{ marginTop: 20, color: colors.ink }}>{aviso}</Txt>
      <Txt v="suave" style={{ marginTop: 4, fontSize: 13 }}>Cada dia em que você cumpre a meta conta para o desafio.</Txt>
      {!!erro && <Txt v="suave" style={{ marginTop: 12, color: colors.ink }}>{erro}</Txt>}

      <View style={{ flex: 1, minHeight: 32 }} />
      <Button title="Criar desafio" onPress={criar} loading={salvando} disabled={!valido} />
    </Screen>
  );
}