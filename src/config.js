import { Platform } from 'react-native';

// Emulador Android acessa o PC por 10.0.2.2.
// Celular físico: troque pelo IP do PC na mesma rede Wi-Fi (ex.: '192.168.0.10').
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const API_URL = `http://${HOST}:8080/api`;
