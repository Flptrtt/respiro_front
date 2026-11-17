import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, definirToken } from '../api/client';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const salvo = await AsyncStorage.getItem('token');
        if (salvo) {
          definirToken(salvo);
          setUsuario(await api.me());
          setToken(salvo);
        }
      } catch {
        definirToken(null);
        await AsyncStorage.removeItem('token');
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  async function entrar(resposta) {
    definirToken(resposta.token);
    await AsyncStorage.setItem('token', resposta.token);
    setUsuario(resposta.usuario);
    setToken(resposta.token);
  }

  const value = {
    token,
    usuario,
    carregando,
    login: async (email, senha) => entrar(await api.login(email, senha)),
    registrar: async (nome, email, senha) => entrar(await api.registrar(nome, email, senha)),
    recarregar: async () => setUsuario(await api.me()),
    sair: async () => {
      definirToken(null);
      await AsyncStorage.removeItem('token');
      setToken(null);
      setUsuario(null);
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
