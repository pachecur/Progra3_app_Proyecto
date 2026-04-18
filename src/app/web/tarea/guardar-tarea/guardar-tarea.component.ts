import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TareaService } from '../../../shared/services/tarea.service';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';
import { inputATiempoApi } from '../../../shared/utils/tiempo-formulario';
import { horaFinPosteriorAInicio } from '../../../shared/utils/tarea-form-validators';

@Component({
  selector: 'app-guardar-tarea',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './guardar-tarea.component.html',
  styleUrl: './guardar-tarea.component.css',
})
export class GuardarTarea {
  public nombre: FormControl<string | null>;
  public descripcion: FormControl<string | null>;
  public hora_inicio: FormControl<string | null>;
  public hora_fin: FormControl<string | null>;
  public estado: FormControl<number | null>;
  public formGuardar: FormGroup;

  constructor(
    private servicio: TareaService,
    private router: Router,
    private dialogo: MatDialog
  ) {
    this.nombre = new FormControl('', Validators.required);
    this.descripcion = new FormControl('', [Validators.required, Validators.maxLength(2000)]);
    this.hora_inicio = new FormControl('', Validators.required);
    this.hora_fin = new FormControl('', Validators.required);
    this.estado = new FormControl<number>(1, Validators.required);

    this.formGuardar = new FormGroup(
      {
        nombre: this.nombre,
        descripcion: this.descripcion,
        hora_inicio: this.hora_inicio,
        hora_fin: this.hora_fin,
        estado: this.estado,
      },
      { validators: horaFinPosteriorAInicio() }
    );
  }

  public guardar(): void {
    this.formGuardar.updateValueAndValidity();
    if (this.formGuardar.valid) {
      const row = {
        nombre: this.nombre.value ?? '',
        descripcion: this.descripcion.value ?? '',
        hora_inicio: inputATiempoApi(this.hora_inicio.value),
        hora_fin: inputATiempoApi(this.hora_fin.value),
        estado: Number(this.estado.value) === 1,
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
                mensaje: 'Se guardó correctamente la tarea.',
                tipo: 'exito',
              },
            });
            this.router.navigate(['/app/tareas']);
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
                mensaje: 'Ocurrió un problema al registrar la tarea.',
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
              mensaje: 'Ocurrió un problema al registrar la tarea.',
              tipo: 'error',
            },
          });
        },
      });
    }
  }
}
