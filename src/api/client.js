import { API_URL } from '../config';

let token = null;
export const definirToken = (t) => { token = t; };

async function request(metodo, caminho, corpo) {
  let res;
  try {
    res = await fetch(API_URL + caminho, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor');
  }
  if (!res.ok) {
    const dados = await res.json().catch(() => ({}));
    const erro = new Error(dados.erro || 'Algo deu errado');
    erro.status = res.status;
    throw erro;
  }
  return res.json();
}

export const api = {
  registrar: (nome, email, senha) => request('POST', '/auth/registrar', { nome, email, senha }),
  login: (email, senha) => request('POST', '/auth/login', { email, senha }),
  me: () => request('GET', '/me'),
  onboarding: (dados) => request('PUT', '/me/onboarding', dados),
  atualizarMeta: (metaDiariaHoras) => request('PUT', '/me/meta', { metaDiariaHoras }),
  atualizarInteresses: (interesses) => request('PUT', '/me/interesses', { interesses }),
  home: () => request('GET', '/home'),
  sugestao: () => request('GET', '/sugestao'),
  desafios: () => request('GET', '/desafios'),
  criarDesafio: (dados) => request('POST', '/desafios', dados),
  finalizarSessao: (minutos, presente) => request('POST', '/sessoes', { minutos, presente }),
};
