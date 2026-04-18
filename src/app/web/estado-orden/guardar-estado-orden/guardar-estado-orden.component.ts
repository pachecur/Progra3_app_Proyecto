import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EstadoOrdenService } from '../../../shared/services/estado-orden.service';
import { IEstadoOrden } from '../../../shared/interfaces/iestado-orden';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-guardar-estado-orden',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './guardar-estado-orden.component.html',
  styleUrl: './guardar-estado-orden.component.css',
})
export class GuardarEstadoOrden {
  public nombre: FormControl<string | null>;
  public formGuardar: FormGroup;

  constructor(
    private servicio: EstadoOrdenService,
    private router: Router,
    private dialogo: MatDialog
  ) {
    this.nombre = new FormControl('', Validators.required);
    this.formGuardar = new FormGroup({
      nombre: this.nombre,
    });
  }

  public guardar(): void {
    if (this.formGuardar.valid) {
      const row: IEstadoOrden = {
        id_estado_orden: 0,
        nombre: this.nombre.value ?? '',
      };

      this.servicio.Guardar(row).subscribe({
        next: (resp) => {
          if (resp > 0) {
            this.dialogo.open(Mensaje, {
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              maxHeight: '700px',
              disableClose: true,
              hasBackdrop: true,
              data: {
                titulo: 'Aviso',
                mensaje: 'Se guardó correctamente el estado de orden.',
                tipo: 'exito',
              },
            });
            this.router.navigate(['/app/estados-orden']);
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
                mensaje: 'Ocurrió un problema al registrar el estado de orden.',
                tipo: 'error',
              },
            });
          }
        },
        error: () => {
          this.dialogo.open(Mensaje, {
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            maxHeight: '700px',
            disableClose: true,
            hasBackdrop: true,
            data: {
              titulo: 'Aviso',
              mensaje: 'Ocurrió un problema al registrar el estado de orden.',
              tipo: 'error',
            },
          });
        },
      });
    }
  }
}
