import { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Card from '../components/Card';
import Button from '../components/Button';
import Ring from '../components/Ring';
import ProgressBar from '../components/ProgressBar';
import { api } from '../api/client';
import { colors, fonts } from '../theme/theme';
import { PLANTAS } from '../utils/constantes';
import { formatarMinutos } from '../utils/format';

function saudacao() {
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
}

export default function HomeScreen({ navigation }) {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      api.home()
        .then((d) => ativo && (setDados(d), setErro('')))
        .catch((e) => ativo && setErro(e.message));
      return () => { ativo = false; };
    }, [])
  );

  if (!dados) {
    return (
      <Screen style={{ justifyContent: 'center' }}>
        {erro ? <Txt v="suave" style={{ textAlign: 'center' }}>{erro}</Txt> : <ActivityIndicator color={colors.sage} />}
      </Screen>
    );
  }

  const { nivel } = dados;
  const faltam = nivel.proximoPontos ? nivel.proximoPontos - dados.pontos : 0;

  return (
    <Screen scroll>
      <Txt v="suave" style={{ color: colors.sage }}>{saudacao()},</Txt>
      <Txt v="titulo" style={{ marginBottom: 20 }}>{dados.nome} 👋</Txt>

      <Card style={{ marginBottom: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Txt v="rotulo">META SEMANAL</Txt>
            <Txt v="secao" style={{ fontSize: 22, marginVertical: 4 }}>{dados.metaDiariaHoras}h por dia</Txt>
            <Txt v="suave">Hoje: {formatarMinutos(dados.minutosHoje)} offline</Txt>
          </View>
          <Ring size={80} stroke={8} progress={dados.percentualSemana / 100}>
            <Txt style={{ fontFamily: fonts.negrito, color: colors.sage, fontSize: 17 }}>{dados.percentualSemana}%</Txt>
          </Ring>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
          {dados.diasSemana.map((d, i) => (
            <View key={i} style={{ alignItems: 'center', gap: 6 }}>
              <View style={{
                width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                backgroundColor: d.feito ? colors.sage : d.hoje ? colors.sageSoft : colors.track,
              }}>
                {d.feito ? <Feather name="check" size={16} color="#fff" />
                  : d.hoje ? <Txt v="rotulo" style={{ color: colors.sage }}>hj</Txt> : null}
              </View>
              <Txt v="rotulo">{d.rotulo}</Txt>
            </View>
          ))}
        </View>
      </Card>

      <Card style={{ marginBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: colors.sageSoft, alignItems: 'center', justifyContent: 'center' }}>
          <Txt style={{ fontSize: 26 }}>{PLANTAS[nivel.numero - 1]}</Txt>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Txt v="suave" style={{ fontSize: 13 }}>Nível {nivel.numero} · {nivel.nome}</Txt>
            {nivel.proximoNome && <Txt v="suave" style={{ fontSize: 12 }}>{faltam} p/ {nivel.proximoNome}</Txt>}
          </View>
          <Txt style={{ fontFamily: fonts.titulo, fontSize: 20, color: colors.peach, marginVertical: 4 }}>★ {dados.pontos} pontos</Txt>
          {nivel.proximoPontos && <ProgressBar value={dados.pontos / nivel.proximoPontos} color={colors.peach} />}
        </View>
      </Card>

      <Card style={{ marginBottom: 24, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <Txt style={{ fontSize: 30 }}>🔥</Txt>
        <View style={{ flex: 1 }}>
          <Txt v="secao">{dados.sequencia} {dados.sequencia === 1 ? 'dia seguido' : 'dias seguidos'}</Txt>
          <Txt v="suave" style={{ marginTop: 2 }}>
            {dados.sequencia === 0
              ? 'Faça uma sessão hoje para começar sua sequência.'
              : dados.diasParaMelhor > 0
                ? `Continue assim! Mais ${dados.diasParaMelhor} ${dados.diasParaMelhor === 1 ? 'dia' : 'dias'} para sua melhor sequência.`
                : 'Essa é a sua melhor sequência até agora!'}
          </Txt>
        </View>
      </Card>

      <Button title="Começar sessão offline" onPress={() => navigation.navigate('SessaoSetup')} />
    </Screen>
  );
}
