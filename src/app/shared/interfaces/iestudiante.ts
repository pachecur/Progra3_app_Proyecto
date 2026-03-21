export interface IEstudiante {
  id_estudiante: number;
  id_tipo_identificacion: number;
  identificacion: string;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  fecha_nacimiento: Date;
  direccion: string;
  estado: string;
}