import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Input from '../components/Input';
import Button from '../components/Button';
import BotaoVoltar from '../components/BotaoVoltar';
import { api } from '../api/client';
import { colors, fonts, radius } from '../theme/theme';
import { DURACOES_SESSAO } from '../utils/constantes';
import { formatarMinutos } from '../utils/format';

export default function SessaoSetupScreen({ navigation }) {
  const [min, setMin] = useState(30);
  const [personalizado, setPersonalizado] = useState(false);
  const [horas, setHoras] = useState('');
  const [mins, setMins] = useState('');
  const [sugestao, setSugestao] = useState(null);

  useEffect(() => {
    api.sugestao().then(setSugestao).catch(() => {});
  }, []);

  const minutos = personalizado ? (parseInt(horas, 10) || 0) * 60 + (parseInt(mins, 10) || 0) : min;
  const valido = minutos >= 1 && minutos <= 720;

  return (
    <Screen scroll style={{ flexGrow: 1 }}>
      <BotaoVoltar onPress={() => navigation.goBack()} />
      <Txt v="titulo">Hora de respirar</Txt>
      <Txt v="suave" style={{ marginTop: 6, marginBottom: 24 }}>Quanto tempo você quer ficar offline?</Txt>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 }}>
        {DURACOES_SESSAO.map((o) => {
          const ativo = !personalizado && min === o.min;
          return (
            <Pressable
              key={o.min}
              onPress={() => { setPersonalizado(false); setMin(o.min); }}
              style={{ width: '30%', height: 60, borderRadius: radius.campo, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
                borderColor: ativo ? colors.sage : colors.border, backgroundColor: ativo ? colors.sageSoft : colors.card }}
            >
              <Txt v="secao" style={{ fontSize: 15 }}>{o.rotulo}</Txt>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => setPersonalizado(true)}
        style={{ marginTop: 12, height: 54, borderRadius: radius.campo, borderWidth: 1, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center',
          borderColor: personalizado ? colors.sage : colors.border, backgroundColor: personalizado ? colors.sageSoft : colors.card }}
      >
        <Feather name="edit-2" size={15} color={colors.peach} />
        <Txt style={{ fontFamily: fonts.medio }}>Personalizado</Txt>
      </Pressable>
      {personalizado && (
        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Input style={{ flex: 1 }} placeholder="Horas" keyboardType="number-pad" value={horas} onChangeText={setHoras} maxLength={2} />
            <Input style={{ flex: 1 }} placeholder="Minutos" keyboardType="number-pad" value={mins} onChangeText={setMins} maxLength={3} />
          </View>
          <Txt v="suave" style={{ marginTop: 8 }}>
            {minutos > 720 ? 'O máximo é 12 horas.' : minutos > 0 ? `Sessão de ${formatarMinutos(minutos)}` : 'Digite as horas e/ou os minutos.'}
          </Txt>
        </View>
      )}

      {sugestao && (
        <View style={{ marginTop: 24, padding: 18, borderRadius: radius.card, backgroundColor: colors.sageSoft }}>
          <Txt v="rotulo" style={{ color: colors.sage, marginBottom: 10 }}>SUGESTÃO PARA VOCÊ</Txt>
          <View style={{ flexDirection: 'row', gap: 14 }}>
            <Feather name={sugestao.icone} size={26} color={colors.muted} style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Txt v="secao" style={{ fontSize: 16 }}>{sugestao.titulo}</Txt>
              <Txt v="suave" style={{ marginTop: 4, color: colors.ink }}>{sugestao.descricao}</Txt>
            </View>
          </View>
        </View>
      )}

      <View style={{ flex: 1, minHeight: 32 }} />
      <Button title="Iniciar sessão" disabled={!valido} onPress={() => navigation.navigate('SessaoTimer', { minutos })} />
    </Screen>
  );
}