import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';
import { ITipoIdentificacion } from '../../../shared/interfaces/itipo-identificacion';
import { TipoIdentificacionService } from '../../../shared/services/tipo-identificacion.service';

@Component({
  selector: 'app-actualizar-tipo-identificacion',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './actualizar-tipo-identificacion.component.html',
  styleUrl: './actualizar-tipo-identificacion.component.css',
})
export class ActualizarTipoIdentificacion implements OnInit {
  private id_tipo_identificacion = 0;
  public nombre: FormControl;
  public mascara: FormControl;

  public formGuardar: FormGroup;

  constructor(
    private servicio: TipoIdentificacionService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogo: MatDialog
  ) {
    this.nombre = new FormControl('', Validators.required);
    this.mascara = new FormControl('', Validators.required);

    this.formGuardar = new FormGroup({
      nombre: this.nombre,
      mascara: this.mascara,
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_tipo_identificacion = id ? Number(id) : 0;

    this.servicio.consultar(this.id_tipo_identificacion).subscribe({
      next: (resp: ITipoIdentificacion) => {
        if (resp?.id_tipo_identificacion > 0) {
          this.nombre.setValue(resp.nombre);
          this.mascara.setValue(resp.mascara);
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
              mensaje: 'No se encontró el tipo de identificación consultado.',
              tipo: 'advertencia',
            },
          });
          this.router.navigate(['/app/tipos-identificacion']);
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
            mensaje: 'No se encontró el tipo de identificación consultado.',
            tipo: 'advertencia',
          },
        });
        this.router.navigate(['/app/tipos-identificacion']);
      },
    });
  }

  public actualizar(): void {
    if (this.formGuardar.valid) {
      const tipo: ITipoIdentificacion = {
        id_tipo_identificacion: this.id_tipo_identificacion,
        nombre: this.nombre.value ?? '',
        mascara: this.mascara.value ?? '',
      };

      this.servicio.Actualizar(tipo).subscribe({
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
                mensaje: 'Se actualizó correctamente el tipo de identificación.',
                tipo: 'exito',
              },
            });
            this.router.navigate(['/app/tipos-identificacion']);
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
                mensaje: 'Ocurrió un problema al actualizar el tipo de identificación.',
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
              mensaje: 'Ocurrió un problema al actualizar el tipo de identificación.',
              tipo: 'error',
            },
          });
        },
      });
    }
  }
}
