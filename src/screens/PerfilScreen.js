import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Card from '../components/Card';
import Chip from '../components/Chip';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { colors, fonts } from '../theme/theme';
import { INTERESSES, PLANTAS } from '../utils/constantes';
import { rotuloDia } from '../utils/format';

export default function PerfilScreen() {
  const { sair } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [interesses, setInteresses] = useState([]);
  const [erro, setErro] = useState('');

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      api.me().then((p) => ativo && (setPerfil(p), setInteresses(p.interesses))).catch((e) => ativo && setErro(e.message));
      return () => { ativo = false; };
    }, [])
  );

  if (!perfil) {
    return <Screen><Txt v="suave" style={{ textAlign: 'center', marginTop: 40 }}>{erro || 'Carregando...'}</Txt></Screen>;
  }

  async function mudarMeta(h) {
    try { setPerfil(await api.atualizarMeta(h)); } catch (e) { setErro(e.message); }
  }

  async function alternarEdicao() {
    if (editando) {
      if (interesses.length === 0) return setErro('Escolha ao menos um interesse');
      try { setPerfil(await api.atualizarInteresses(interesses)); setErro(''); } catch (e) { return setErro(e.message); }
    }
    setEditando(!editando);
  }

  const alternar = (nome) =>
    setInteresses((a) => (a.includes(nome) ? a.filter((i) => i !== nome) : [...a, nome]));

  return (
    <Screen scroll>
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <View style={{ width: 96, height: 96, borderRadius: 28, backgroundColor: colors.sageSoft, alignItems: 'center', justifyContent: 'center' }}>
          <Txt style={{ fontSize: 44 }}>{PLANTAS[perfil.nivel.numero - 1]}</Txt>
        </View>
        <Txt v="titulo" style={{ fontSize: 24, marginTop: 14 }}>{perfil.nome}</Txt>
        <Txt style={{ fontFamily: fonts.medio, color: colors.sage, marginTop: 4 }}>Nível {perfil.nivel.numero} · {perfil.nivel.nome}</Txt>
        <Txt style={{ fontFamily: fonts.titulo, fontSize: 18, color: colors.peach, marginTop: 6 }}>★ {perfil.pontos} pontos</Txt>
      </View>

      <Card style={{ marginBottom: 14 }}>
        <Txt v="secao" style={{ marginBottom: 12 }}>Meta semanal</Txt>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[1, 2, 3, 4].map((h) => (
            <Pressable
              key={h}
              onPress={() => mudarMeta(h)}
              style={{ flex: 1, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: perfil.metaDiariaHoras === h ? colors.sage : colors.bg }}
            >
              <Txt style={{ fontFamily: fonts.negrito, color: perfil.metaDiariaHoras === h ? '#fff' : colors.muted }}>{h}h</Txt>
            </Pressable>
          ))}
        </View>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Txt v="secao">Interesses</Txt>
          <Pressable onPress={alternarEdicao} hitSlop={10}>
            <Txt style={{ fontFamily: fonts.medio, color: colors.sage }}>{editando ? 'Salvar' : 'Editar'}</Txt>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {(editando ? INTERESSES : perfil.interesses).map((nome) => (
            <Chip key={nome} label={nome} selected={editando ? interesses.includes(nome) : true} onPress={editando ? () => alternar(nome) : undefined} />
          ))}
        </View>
        {!!erro && <Txt v="suave" style={{ marginTop: 10, color: colors.ink }}>{erro}</Txt>}
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <Txt v="secao" style={{ marginBottom: 8 }}>Sessões recentes</Txt>
        {perfil.sessoesRecentes.length === 0 && <Txt v="suave">Suas sessões vão aparecer aqui.</Txt>}
        {perfil.sessoesRecentes.map((s, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: colors.border }}>
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.sageSoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <Feather name="shield" size={16} color={colors.sage} />
            </View>
            <View style={{ flex: 1 }}>
              <Txt style={{ fontFamily: fonts.medio }}>{s.minutos} min offline</Txt>
              <Txt v="suave" style={{ fontSize: 12 }}>{rotuloDia(s.dia)}</Txt>
            </View>
            <Txt style={{ fontFamily: fonts.negrito, color: colors.peach }}>★ +{s.pontos}</Txt>
          </View>
        ))}
      </Card>

      <Button variant="secondary" title="Sair" onPress={sair} />
    </Screen>
  );
}
