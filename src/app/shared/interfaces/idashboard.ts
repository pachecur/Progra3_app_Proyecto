/**
 * Respuesta de GET /api/dashboard/resumen (dominio del proyecto).
 */
export interface IDashboardResumen {
  empleados: number;
  tareas: number;
  estados_orden: number;
  tipos_identificacion: number;
}
