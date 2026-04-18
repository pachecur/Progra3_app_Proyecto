import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión - P3',
    canActivate: [guestGuard],
    loadComponent: () => import('./web/login/login.component').then((m) => m.Login),
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/layout/layout.component').then((m) => m.Layout),
    children: [
      {
        path: 'inicio',
        title: 'Inicio - P3',
        loadComponent: () => import('./web/inicio/inicio.component').then((m) => m.Inicio),
      },
      {
        path: 'tipos-identificacion',
        loadComponent: () =>
          import(
            './web/tipo-identificacion/listar-tipo-identificacion/listar-tipo-identificacion.component'
          ).then((m) => m.ListarTipoIdentificacion),
      },
      {
        path: 'tipos-identificacion/guardar',
        loadComponent: () =>
          import(
            './web/tipo-identificacion/guardar-tipo-identificacion/guardar-tipo-identificacion.component'
          ).then((m) => m.GuardarTipoIdentificacion),
      },
      {
        path: 'tipos-identificacion/actualizar/:id',
        loadComponent: () =>
          import(
            './web/tipo-identificacion/actualizar-tipo-identificacion/actualizar-tipo-identificacion.component'
          ).then((m) => m.ActualizarTipoIdentificacion),
      },
      {
        path: 'empleados',
        loadComponent: () =>
          import('./web/empleado/listar-empleado/listar-empleado.component').then((m) => m.ListarEmpleado),
      },
      {
        path: 'empleados/guardar',
        loadComponent: () =>
          import('./web/empleado/guardar-empleado/guardar-empleado.component').then((m) => m.GuardarEmpleado),
      },
      {
        path: 'empleados/actualizar/:id',
        loadComponent: () =>
          import('./web/empleado/actualizar-empleado/actualizar-empleado.component').then(
            (m) => m.ActualizarEmpleado
          ),
      },
      {
        path: 'estados-orden',
        loadComponent: () =>
          import('./web/estado-orden/listar-estado-orden/listar-estado-orden.component').then(
            (m) => m.ListarEstadoOrden
          ),
      },
      {
        path: 'estados-orden/guardar',
        loadComponent: () =>
          import('./web/estado-orden/guardar-estado-orden/guardar-estado-orden.component').then(
            (m) => m.GuardarEstadoOrden
          ),
      },
      {
        path: 'estados-orden/actualizar/:id',
        loadComponent: () =>
          import(
            './web/estado-orden/actualizar-estado-orden/actualizar-estado-orden.component'
          ).then((m) => m.ActualizarEstadoOrden),
      },
      {
        path: 'tareas',
        loadComponent: () =>
          import('./web/tarea/listar-tarea/listar-tarea.component').then((m) => m.ListarTarea),
      },
      {
        path: 'tareas/guardar',
        loadComponent: () =>
          import('./web/tarea/guardar-tarea/guardar-tarea.component').then((m) => m.GuardarTarea),
      },
      {
        path: 'tareas/actualizar/:id',
        loadComponent: () =>
          import('./web/tarea/actualizar-tarea/actualizar-tarea.component').then((m) => m.ActualizarTarea),
      },
      {
        path: 'usuarios',
        title: 'Usuarios - P3',
        loadComponent: () =>
          import('./web/usuario/listar-usuario/listar-usuario.component').then((m) => m.ListarUsuario),
      },
      {
        path: 'usuarios/guardar',
        loadComponent: () =>
          import('./web/usuario/guardar-usuario/guardar-usuario.component').then((m) => m.GuardarUsuario),
      },
      {
        path: 'usuarios/actualizar/:id',
        loadComponent: () =>
          import('./web/usuario/actualizar-usuario/actualizar-usuario.component').then(
            (m) => m.ActualizarUsuario
          ),
      },
      {
        path: 'reportes',
        title: 'Reportes - P3',
        loadComponent: () => import('./web/reporte/reporte.component').then((m) => m.Reporte),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'app/inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'app/inicio',
  },
];
