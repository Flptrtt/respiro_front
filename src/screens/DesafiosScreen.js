import { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { api } from '../api/client';
import { colors, fonts } from '../theme/theme';

function rotuloStatus(d) {
  if (d.status === 'CONCLUIDO') return 'Concluído';
  if (d.status === 'ENCERRADO') return 'Encerrado';
  return `${d.diasRestantes} ${d.diasRestantes === 1 ? 'dia' : 'dias'}`;
}

export default function DesafiosScreen({ navigation }) {
  const [lista, setLista] = useState(null);
  const [erro, setErro] = useState('');

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      api.desafios()
        .then((d) => ativo && setLista(d))
        .catch((e) => ativo && setErro(e.message));
      return () => { ativo = false; };
    }, [])
  );

  return (
    <Screen scroll>
      <Txt v="titulo">Desafios</Txt>
      <Txt v="suave" style={{ marginTop: 6, marginBottom: 20 }}>Crie metas pessoais e avance no seu ritmo.</Txt>
      <Button title="+  Criar desafio" onPress={() => navigation.navigate('CriarDesafio')} style={{ marginBottom: 20 }} />

      {!lista && !erro && <ActivityIndicator color={colors.sage} />}
      {!!erro && <Txt v="suave">{erro}</Txt>}
      {lista && lista.length === 0 && <Txt v="suave" style={{ textAlign: 'center' }}>Nenhum desafio ainda. Que tal criar o primeiro?</Txt>}

      <View style={{ gap: 14 }}>
        {lista?.map((d) => (
          <Card key={d.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <Txt v="secao" style={{ fontSize: 18, flex: 1 }}>{d.nome}</Txt>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.bg, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 }}>
                <Feather name="clock" size={13} color={colors.muted} />
                <Txt v="suave" style={{ fontSize: 12 }}>{rotuloStatus(d)}</Txt>
              </View>
            </View>
            <Txt v="suave" style={{ marginTop: 4, marginBottom: 14 }}>{d.descricao}</Txt>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Txt v="suave" style={{ fontSize: 13 }}>Meu progresso</Txt>
              <Txt style={{ fontFamily: fonts.negrito, color: colors.sage }}>{d.percentual}%</Txt>
            </View>
            <ProgressBar value={d.percentual / 100} />
          </Card>
        ))}
      </View>
    </Screen>
  );
}
