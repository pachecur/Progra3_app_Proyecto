import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TipoIdentificacionService } from '../../../shared/services/tipo-identificacion.service';
import { MatDialog } from '@angular/material/dialog';
import { ITipoIdentificacion } from '../../../shared/interfaces/itipo-identificacion';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-guardar-tipo-identificacion',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './guardar-tipo-identificacion.component.html',
  styleUrl: './guardar-tipo-identificacion.component.css',
})
export class GuardarTipoIdentificacion {
  // Definir los campos del formulario.
  public nombre: FormControl;
  public mascara: FormControl;

  public formGuardar: FormGroup;

  constructor(
    private servicio: TipoIdentificacionService,
    private router: Router,
    private dialogo: MatDialog
  ) {
    this.nombre = new FormControl('', Validators.required);
    this.mascara = new FormControl('', Validators.required);

    this.formGuardar = new FormGroup({
      nombre: this.nombre,
      mascara: this.mascara
    });
  }

  public guardar(): void {
    if (this.formGuardar.valid) {
      const tipo: ITipoIdentificacion = {
        id_tipo_identificacion: 0,
        nombre: this.nombre.value ?? '',
        mascara: this.mascara.value ?? '',
      };

      this.servicio.Guardar(tipo).subscribe({
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
                mensaje: 'Se guardó correctamente el tipo de identificación.',
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
                mensaje: 'Ocurrió un problema al registrar el tipo de identificación.',
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
              mensaje: 'Ocurrió un problema al registrar el tipo de identificación.',
              tipo: 'error',
            },
          });
        },
      });
    }
  }
}
