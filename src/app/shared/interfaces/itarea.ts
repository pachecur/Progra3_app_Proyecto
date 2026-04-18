export interface ITarea {
  id_tarea: number;
  nombre: string;
  descripcion: string;
  /** TIME desde API, p. ej. `08:30:00` o fragmento ISO. */
  hora_inicio: string;
  hora_fin: string;
  /** Valor numérico en BD (p. ej. 0/1). */
  estado: number;
}
