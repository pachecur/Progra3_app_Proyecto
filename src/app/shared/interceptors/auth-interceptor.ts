import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const token = auth.obtenerToken();

  const esLogin = req.url.includes('/auth/login');

  const solicitud =
    token && !esLogin ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(solicitud).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !esLogin) {
        auth.limpiarSesion();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
