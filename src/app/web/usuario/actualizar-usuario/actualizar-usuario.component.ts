import { AfterViewInit, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../shared/services/usuario.service';
import { IUsuario } from '../../../shared/interfaces/iusuario';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-actualizar-usuario',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css',
})
export class ActualizarUsuario implements AfterViewInit {
  private id_usuario = 0;

  public nombre: FormControl;
  public apellidos: FormControl;
  public acceso: FormControl;
  public secreto: FormControl;
  public estado: FormControl;
  public formActualizar: FormGroup;
  public verSecreto = signal(false);

  constructor(
    private servicio: Usuario,
    private router: Router,
    private route: ActivatedRoute,
    private dialogo: MatDialog
  ) {
    this.nombre = new FormControl('', Validators.required);
    this.apellidos = new FormControl('', Validators.required);
    this.acceso = new FormControl('', Validators.required);
    this.secreto = new FormControl('', [Validators.minLength(6)]);
    this.estado = new FormControl(1, Validators.required);

    this.formActualizar = new FormGroup({
      nombre: this.nombre,
      apellidos: this.apellidos,
      acceso: this.acceso,
      secreto: this.secreto,
      estado: this.estado,
    });
  }

  ngAfterViewInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_usuario = id ? Number(id) : 0;

    this.servicio.Consultar(this.id_usuario).subscribe({
      next: (resp: IUsuario) => {
        if (resp && resp.id_usuario > 0) {
          this.nombre.setValue(resp.nombre);
          this.apellidos.setValue(resp.apellidos);
          this.acceso.setValue(resp.acceso);
          this.estado.setValue(resp.estado ?? 1);
        } else {
          this.dialogo.open(Mensaje, {
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            maxHeight: '700px',
            disableClose: true,
            hasBackdrop: true,
            data: {
              titulo: 'Aviso',
              mensaje: 'No se encontró el usuario consultado.',
              tipo: 'advertencia',
            },
          });
          this.router.navigate(['/app/usuarios']);
        }
      },
      error: () => {
        this.router.navigate(['/app/usuarios']);
      },
    });
  }

  public alternarSecreto(): void {
    this.verSecreto.update((v) => !v);
  }

  public actualizar(): void {
    if (this.formActualizar.invalid) {
      this.formActualizar.markAllAsTouched();
      return;
    }

    const usuario: IUsuario = {
      id_usuario: this.id_usuario,
      nombre: this.nombre.value,
      apellidos: this.apellidos.value,
      acceso: this.acceso.value,
      estado: Number(this.estado.value),
    };

    const nuevoSecreto = (this.secreto.value || '').trim();
    if (nuevoSecreto) {
      usuario.secreto = nuevoSecreto;
    }

    this.servicio.Actualizar(usuario).subscribe({
      next: (resp: number) => {
        if (resp > 0) {
          this.dialogo.open(Mensaje, {
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            maxHeight: '700px',
            disableClose: true,
            hasBackdrop: true,
            data: { titulo: 'Aviso', mensaje: 'Se actualizó correctamente el usuario.', tipo: 'exito' },
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
            data: { titulo: 'Aviso', mensaje: 'Ocurrió un problema al actualizar el usuario.', tipo: 'error' },
          });
        }
      },
    });
  }
}
