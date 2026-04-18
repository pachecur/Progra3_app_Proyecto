import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';
import { IEstadoOrden } from '../../../shared/interfaces/iestado-orden';
import { EstadoOrdenService } from '../../../shared/services/estado-orden.service';

@Component({
  selector: 'app-actualizar-estado-orden',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './actualizar-estado-orden.component.html',
  styleUrl: './actualizar-estado-orden.component.css',
})
export class ActualizarEstadoOrden implements OnInit {
  private id_estado_orden = 0;
  public nombre: FormControl<string | null>;
  public formGuardar: FormGroup;

  constructor(
    private servicio: EstadoOrdenService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogo: MatDialog
  ) {
    this.nombre = new FormControl('', Validators.required);
    this.formGuardar = new FormGroup({
      nombre: this.nombre,
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_estado_orden = id ? Number(id) : 0;

    this.servicio.consultar(this.id_estado_orden).subscribe({
      next: (resp: IEstadoOrden) => {
        if (resp?.id_estado_orden > 0) {
          this.nombre.setValue(resp.nombre);
        } else {
          this.mostrarNoEncontrado();
        }
      },
      error: () => this.mostrarNoEncontrado(),
    });
  }

  private mostrarNoEncontrado(): void {
    this.dialogo.open(Mensaje, {
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      maxHeight: '700px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        titulo: 'Aviso',
        mensaje: 'No se encontró el estado de orden consultado.',
        tipo: 'advertencia',
      },
    });
    this.router.navigate(['/app/estados-orden']);
  }

  public actualizar(): void {
    if (this.formGuardar.valid) {
      const row: IEstadoOrden = {
        id_estado_orden: this.id_estado_orden,
        nombre: this.nombre.value ?? '',
      };

      this.servicio.Actualizar(row).subscribe({
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
                mensaje: 'Se actualizó correctamente el estado de orden.',
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
                mensaje: 'Ocurrió un problema al actualizar el estado de orden.',
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
              mensaje: 'Ocurrió un problema al actualizar el estado de orden.',
              tipo: 'error',
            },
          });
        },
      });
    }
  }
}
