import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ITarea } from '../../../shared/interfaces/itarea';
import { TareaService } from '../../../shared/services/tarea.service';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';
import { inputATiempoApi, tiempoApiAInput } from '../../../shared/utils/tiempo-formulario';
import { horaFinPosteriorAInicio } from '../../../shared/utils/tarea-form-validators';

@Component({
  selector: 'app-actualizar-tarea',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './actualizar-tarea.component.html',
  styleUrl: './actualizar-tarea.component.css',
})
export class ActualizarTarea implements OnInit {
  private id_tarea = 0;
  public nombre: FormControl<string | null>;
  public descripcion: FormControl<string | null>;
  public hora_inicio: FormControl<string | null>;
  public hora_fin: FormControl<string | null>;
  public estado: FormControl<number | null>;
  public formGuardar: FormGroup;

  constructor(
    private servicio: TareaService,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_tarea = id ? Number(id) : 0;

    this.servicio.consultar(this.id_tarea).subscribe({
      next: (resp: ITarea) => {
        if (resp?.id_tarea > 0) {
          this.nombre.setValue(resp.nombre);
          this.descripcion.setValue(resp.descripcion ?? '');
          this.hora_inicio.setValue(tiempoApiAInput(resp.hora_inicio));
          this.hora_fin.setValue(tiempoApiAInput(resp.hora_fin));
          this.estado.setValue(Number(resp.estado));
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
        mensaje: 'No se encontró la tarea consultada.',
        tipo: 'advertencia',
      },
    });
    this.router.navigate(['/app/tareas']);
  }

  public actualizar(): void {
    this.formGuardar.updateValueAndValidity();
    if (this.formGuardar.valid) {
      const row: ITarea = {
        id_tarea: this.id_tarea,
        nombre: this.nombre.value ?? '',
        descripcion: this.descripcion.value ?? '',
        hora_inicio: inputATiempoApi(this.hora_inicio.value),
        hora_fin: inputATiempoApi(this.hora_fin.value),
        estado: Number(this.estado.value),
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
                mensaje: 'Se actualizó correctamente la tarea.',
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
                mensaje: 'Ocurrió un problema al actualizar la tarea.',
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
              mensaje: 'Ocurrió un problema al actualizar la tarea.',
              tipo: 'error',
            },
          });
        },
      });
    }
  }
}
