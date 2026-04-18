import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../../shared/services/auth';
import { Mensaje } from '../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {
  public acceso: FormControl;
  public secreto: FormControl;
  public formLogin: FormGroup;
  public cargando = signal(false);
  public verSecreto = signal(false);
  public readonly anio = new Date().getFullYear();

  constructor(private auth: Auth, private router: Router, private dialogo: MatDialog) {
    this.acceso = new FormControl('', [Validators.required]);
    this.secreto = new FormControl('', [Validators.required]);
    this.formLogin = new FormGroup({
      acceso: this.acceso,
      secreto: this.secreto,
    });
  }

  public alternarSecreto(): void {
    this.verSecreto.update((v) => !v);
  }

  public iniciarSesion(): void {
    if (this.formLogin.invalid || this.cargando()) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.cargando.set(true);

    this.auth
      .Login({ acceso: this.acceso.value, secreto: this.secreto.value })
      .subscribe({
        next: () => {
          this.cargando.set(false);
          this.router.navigate(['/app/inicio']);
        },
        error: (err: HttpErrorResponse) => {
          this.cargando.set(false);
          const mensaje =
            err.status === 401
              ? 'Credenciales incorrectas o usuario inactivo.'
              : 'No se pudo iniciar sesión. Intente nuevamente.';
          this.dialogo.open(Mensaje, {
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            maxHeight: '700px',
            disableClose: true,
            hasBackdrop: true,
            data: {
              titulo: 'Aviso',
              mensaje,
              tipo: 'error',
            },
          });
        },
      });
  }
}
