import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../shared/services/usuario.service';
import { IUsuario } from '../../../shared/interfaces/iusuario';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-guardar-usuario',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './guardar-usuario.component.html',
  styleUrl: './guardar-usuario.component.css',
})
export class GuardarUsuario {
  public nombre: FormControl;
  public apellidos: FormControl;
  public acceso: FormControl;
  public secreto: FormControl;
  public estado: FormControl;
  public formGuardar: FormGroup;
  public verSecreto = signal(false);

  constructor(private servicio: Usuario, private router: Router, private dialogo: MatDialog) {
    this.nombre = new FormControl('', Validators.required);
    this.apellidos = new FormControl('', Validators.required);
    this.acceso = new FormControl('', Validators.required);
    this.secreto = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.estado = new FormControl(1, Validators.required);

    this.formGuardar = new FormGroup({
      nombre: this.nombre,
      apellidos: this.apellidos,
      acceso: this.acceso,
      secreto: this.secreto,
      estado: this.estado,
    });
  }

  public alternarSecreto(): void {
    this.verSecreto.update((v) => !v);
  }

  public guardar(): void {
    if (this.formGuardar.invalid) {
      this.formGuardar.markAllAsTouched();
      return;
    }

    const usuario: IUsuario = {
      id_usuario: 0,
      nombre: this.nombre.value,
      apellidos: this.apellidos.value,
      acceso: this.acceso.value,
      secreto: this.secreto.value,
      estado: Number(this.estado.value),
    };

    this.servicio.Guardar(usuario).subscribe({
      next: (resp: number) => {
        if (resp > 0) {
          this.dialogo.open(Mensaje, {
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            maxHeight: '700px',
            disableClose: true,
            hasBackdrop: true,
            data: { titulo: 'Aviso', mensaje: 'Se guardó correctamente el usuario.', tipo: 'exito' },
          });
          this.router.navigate(['/app/usuarios']);
        } else {
          this.dialogo.open(Mensaje, {
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            maxHeight: '700px',
            disableClose: true,
            hasBackdrop: true,
            data: { titulo: 'Aviso', mensaje: 'Ocurrió un problema al registrar el usuario.', tipo: 'error' },
          });
        }
      },
    });
  }
}
