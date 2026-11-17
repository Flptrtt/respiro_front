import { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Button from '../components/Button';
import Ring from '../components/Ring';
import { colors, fonts } from '../theme/theme';
import { formatarMinutos, formatarRelogio } from '../utils/format';

export default function SessaoTimerScreen({ navigation, route }) {
  const { minutos } = route.params;
  const totalMs = minutos * 60000;
  // Guardamos o horário final (e não um contador) para o tempo seguir correto com o app em segundo plano.
  const fimRef = useRef(Date.now() + totalMs);
  const [restante, setRestante] = useState(totalMs);
  const [pausado, setPausado] = useState(false);
  const encerrou = useRef(false);

  function terminar(minutosFeitos) {
    if (encerrou.current) return;
    encerrou.current = true;
    if (minutosFeitos < 1) navigation.goBack();
    else navigation.replace('SessaoConcluida', { minutos: minutosFeitos });
  }

  useEffect(() => {
    if (pausado) return;
    const id = setInterval(() => {
      const r = Math.max(0, fimRef.current - Date.now());
      setRestante(r);
      if (r === 0) terminar(minutos);
    }, 500);
    return () => clearInterval(id);
  }, [pausado]);

  const restanteAgora = () => (pausado ? restante : Math.max(0, fimRef.current - Date.now()));

  function alternarPausa() {
    if (pausado) fimRef.current = Date.now() + restante;
    else setRestante(Math.max(0, fimRef.current - Date.now()));
    setPausado(!pausado);
  }

  function encerrar() {
    const feitos = Math.floor((totalMs - restanteAgora()) / 60000);
    Alert.alert('Encerrar sessão?', 'Os minutos já feitos serão contabilizados.', [
      { text: 'Continuar', style: 'cancel' },
      { text: 'Encerrar', onPress: () => terminar(feitos) },
    ]);
  }

  return (
    <Screen bg={colors.ink}>
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <Txt v="rotulo" style={{ color: colors.sage, fontSize: 13 }}>SESSÃO OFFLINE</Txt>
        <Txt v="suave" style={{ color: '#B8C4C9', marginTop: 4 }}>{formatarMinutos(minutos)}</Txt>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Ring size={250} stroke={10} progress={(totalMs - restante) / totalMs} color={colors.sageSoft} track="rgba(247,244,238,0.15)">
          <Txt style={{ fontFamily: fonts.titulo, fontSize: 52, color: '#fff' }}>{formatarRelogio(restante)}</Txt>
          <Txt v="suave" style={{ color: '#B8C4C9' }}>{pausado ? 'pausado' : 'restantes'}</Txt>
        </Ring>
        <Txt v="suave" style={{ color: '#B8C4C9', textAlign: 'center', marginTop: 40, fontSize: 16 }}>
          Respire fundo. O mundo pode esperar.
        </Txt>
      </View>

      <View style={{ gap: 12 }}>
        <Button title={pausado ? 'Retomar' : 'Pausar'} onPress={alternarPausa} style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
        <Button title="Encerrar sessão" variant="secondary" onPress={encerrar} style={{ backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.15)' }} />
      </View>
    </Screen>
  );
}
