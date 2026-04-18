import { ITipoIdentificacion } from './itipo-identificacion';

export interface IEmpleado {
  id_empleado: number;
  id_tipo_identificacion?: number;
  tipo_identificacion?: ITipoIdentificacion;
  identificacion: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  correo: string;
  estado: number;
  direccion: string;
  puesto: string;
}