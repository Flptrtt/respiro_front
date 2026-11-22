export function formatarMinutos(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
}

export function formatarRelogio(ms) {
  const total = Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const dois = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${dois(m)}:${dois(s)}` : `${dois(m)}:${dois(s)}`;
}

const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function rotuloDia(dia) {
  const hoje = new Date();
  const ontem = new Date(hoje.getTime() - 86400000);
  if (dia === iso(hoje)) return 'Hoje';
  if (dia === iso(ontem)) return 'Ontem';
  return `${dia.slice(8, 10)}/${dia.slice(5, 7)}`;
}
export function formatarPrazo(dias) {
  if (dias < 14) return `${dias} ${dias === 1 ? 'dia' : 'dias'}`;
  if (dias < 60) return `${Math.round(dias / 7)} semanas`;
  if (dias < 730) return `${Math.round(dias / 30)} meses`;
  return `${Math.round(dias / 365)} anos`;
}
