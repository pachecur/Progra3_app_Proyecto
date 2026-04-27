import { IEmpleado } from './iempleado';
import { IEstadoOrden } from './iestado-orden';
import { ITarea } from './itarea';

/** Línea pivot orden–tarea tal como viene del API (snake_case). */
export interface IOrdenTrabajoTarea {
  id_orden_trabajo_tarea?: number;
  horas: number;
  observacion?: string | null;
  tarea?: ITarea;
}

export interface IOrdenTrabajo {
  id_orden_trabajo: number;
  fecha: string;
  descripcion: string;
  total_horas: number;
  /** Columna propia de la fila (no confundir con el catálogo estado_orden). */
  estado: number;
  empleado?: IEmpleado;
  /** Catálogo; el API puede serializar como snake_case o camelCase. */
  estado_orden?: IEstadoOrden;
  estadoOrden?: IEstadoOrden;
  orden_trabajo_tareas?: IOrdenTrabajoTarea[];
}
