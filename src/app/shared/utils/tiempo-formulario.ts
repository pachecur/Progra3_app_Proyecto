/** Convierte TIME/ISO de la API a `HH:mm` para `input[type="time"]`. */
export function tiempoApiAInput(valor: unknown): string {
  if (valor == null || valor === '') {
    return '';
  }
  if (typeof valor === 'string') {
    const m = valor.match(/(\d{2}:\d{2})(?::\d{2})?/);
    if (m) {
      return m[1];
    }
  }
  if (valor instanceof Date && !isNaN(valor.getTime())) {
    const h = valor.getHours().toString().padStart(2, '0');
    const min = valor.getMinutes().toString().padStart(2, '0');
    return `${h}:${min}`;
  }
  return '';
}

/** Convierte valor del input time a cadena tipo TIME (`HH:mm:ss`). */
export function inputATiempoApi(valor: string | null | undefined): string {
  const v = (valor ?? '').trim();
  if (!v) {
    return '';
  }
  if (v.length === 5 && v.includes(':')) {
    return `${v}:00`;
  }
  return v;
}
