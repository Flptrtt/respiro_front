import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Screen from '../components/Screen';
import Txt from '../components/Txt';
import Input from '../components/Input';
import Button from '../components/Button';
import BotaoVoltar from '../components/BotaoVoltar';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/theme';

export default function LoginScreen({ navigation, route }) {
  const { login, registrar } = useAuth();
  const [criando, setCriando] = useState(route.params?.modo === 'registro');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviar() {
    setErro('');
    setEnviando(true);
    try {
      if (criando) await registrar(nome, email, senha);
      else await login(email, senha);
    } catch (e) {
      setErro(e.message);
      setEnviando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen scroll style={{ flexGrow: 1 }}>
        <BotaoVoltar onPress={() => navigation.goBack()} />
        <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 32 }}>
          <View style={{ width: 72, height: 72, borderRadius: 22, backgroundColor: colors.sageSoft, alignItems: 'center', justifyContent: 'center' }}>
            <Txt style={{ fontSize: 34 }}>🌿</Txt>
          </View>
          <Txt v="titulo" style={{ fontSize: 34, marginTop: 20 }}>Respiro</Txt>
          <Txt v="suave" style={{ marginTop: 6, fontSize: 16 }}>Menos tela, mais vida.</Txt>
        </View>

        <View style={{ gap: 14 }}>
          {criando && <Input placeholder="Nome" value={nome} onChangeText={setNome} autoCapitalize="words" />}
          <Input placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Input placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
          {!!erro && <Txt v="suave" style={{ color: colors.ink }}>{erro}</Txt>}
        </View>

        <View style={{ flex: 1, minHeight: 40 }} />
        <View style={{ gap: 12 }}>
          <Button title={criando ? 'Criar conta' : 'Entrar'} onPress={enviar} loading={enviando} />
          <Button
            variant="secondary"
            title={criando ? 'Já tenho conta' : 'Criar conta'}
            onPress={() => { setCriando(!criando); setErro(''); }}
          />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}
