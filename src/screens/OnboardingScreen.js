import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Button from '../components/Button';
import Chip from '../components/Chip';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { colors, fonts, radius } from '../theme/theme';
import { INTERESSES } from '../utils/constantes';

export default function OnboardingScreen() {
  const { recarregar } = useAuth();
  const [passo, setPasso] = useState(1);
  const [horas, setHoras] = useState(4);
  const [meta, setMeta] = useState(null);
  const [interesses, setInteresses] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const sugerido = Math.min(4, Math.max(1, horas - 1));
  const metaEscolhida = meta ?? sugerido;

  const rotuloMeta = (n) =>
    n === sugerido ? 'Sugerido para você' : n < sugerido ? (n === 1 ? 'Desafiador' : 'Moderado') : 'Tranquilo';

  const alternar = (nome) =>
    setInteresses((atual) => (atual.includes(nome) ? atual.filter((i) => i !== nome) : [...atual, nome]));

  async function concluir() {
    setSalvando(true);
    setErro('');
    try {
      await api.onboarding({ horasIniciais: horas, metaDiariaHoras: metaEscolhida, interesses });
      await recarregar(); // o navegador troca de tela sozinho
    } catch (e) {
      setErro(e.message);
      setSalvando(false);
    }
  }

  return (
    <Screen>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 20 }}>
        {[1, 2, 3].map((n) => (
          <View key={n} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: n <= passo ? colors.sage : colors.track }} />
        ))}
      </View>
      {passo > 1 && (
        <Pressable onPress={() => setPasso(passo - 1)} hitSlop={12} style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
          <Feather name="arrow-left" size={22} color={colors.ink} />
        </Pressable>
      )}
      <Txt v="rotulo" style={{ marginBottom: 8 }}>Passo {passo} de 3</Txt>

      {passo === 1 && (
        <>
          <Txt v="titulo">Quanto tempo por dia você acha que passa no celular?</Txt>
          <Txt v="suave" style={{ marginTop: 10 }}>Seja honesto — não tem resposta errada.</Txt>
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: colors.sageSoft, alignItems: 'center', justifyContent: 'center' }}>
              <Txt style={{ fontFamily: fonts.titulo, fontSize: 36, color: colors.sage }}>{horas === 6 ? '+6h' : `${horas}h`}</Txt>
            </View>
          </View>
          <Slider
            style={{ marginTop: 40, height: 40 }}
            minimumValue={1} maximumValue={6} step={1} value={horas} onValueChange={setHoras}
            minimumTrackTintColor={colors.sage} maximumTrackTintColor={colors.track} thumbTintColor={colors.sage}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Txt v="rotulo">&lt; 1h</Txt>
            <Txt v="rotulo">+6h</Txt>
          </View>
        </>
      )}

      {passo === 2 && (
        <>
          <Txt v="titulo">Qual é sua meta para a primeira semana?</Txt>
          <Txt v="suave" style={{ marginTop: 10 }}>Você usa ~{horas}h por dia. Que tal reduzir um pouco?</Txt>
          <View style={{ gap: 12, marginTop: 28 }}>
            {[1, 2, 3, 4].map((n) => {
              const ativo = n === metaEscolhida;
              return (
                <Pressable
                  key={n}
                  onPress={() => setMeta(n)}
                  style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    padding: 18, borderRadius: radius.campo, borderWidth: 1,
                    borderColor: ativo ? colors.sage : colors.border,
                    backgroundColor: ativo ? colors.sageSoft : colors.card,
                  }}
                >
                  <Txt v="secao" style={{ fontSize: 16 }}>{n}h por dia</Txt>
                  <Txt v="suave" style={{ fontSize: 13, color: ativo ? colors.sage : colors.muted }}>{rotuloMeta(n)}</Txt>
                </Pressable>
              );
            })}
          </View>
        </>
      )}

      {passo === 3 && (
        <>
          <Txt v="titulo">O que você gosta de fazer?</Txt>
          <Txt v="suave" style={{ marginTop: 10 }}>Vamos sugerir atividades offline que você vai curtir.</Txt>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
            {INTERESSES.map((nome) => (
              <Chip key={nome} label={nome} selected={interesses.includes(nome)} onPress={() => alternar(nome)} />
            ))}
          </View>
          {!!erro && <Txt v="suave" style={{ marginTop: 16, color: colors.ink }}>{erro}</Txt>}
        </>
      )}

      <View style={{ flex: 1 }} />
      {passo < 3 ? (
        <Button title="Continuar" onPress={() => setPasso(passo + 1)} />
      ) : (
        <Button title="Começar minha jornada" onPress={concluir} disabled={interesses.length === 0} loading={salvando} />
      )}
    </Screen>
  );
}
