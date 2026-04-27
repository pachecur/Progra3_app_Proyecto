import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService } from '../../../shared/services/empleado.service';
import { TipoIdentificacionService } from '../../../shared/services/tipo-identificacion.service';
import { ITipoIdentificacion } from '../../../shared/interfaces/itipo-identificacion';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-guardar-empleado',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './guardar-empleado.component.html',
  styleUrl: './guardar-empleado.component.css',
})
export class GuardarEmpleado implements OnInit {
  public tipos: ITipoIdentificacion[] = [];

  public id_tipo_identificacion: FormControl<number | null>;
  public identificacion: FormControl<string | null>;
  public nombre: FormControl<string | null>;
  public apellidos: FormControl<string | null>;
  public telefono: FormControl<string | null>;
  public correo: FormControl<string | null>;
  public estado: FormControl<number | null>;
  public direccion: FormControl<string | null>;
  public puesto: FormControl<string | null>;

  public formGuardar: FormGroup;

  constructor(
    private servicio: EmpleadoService,
    private tipoIdServicio: TipoIdentificacionService,
    private router: Router,
    private dialogo: MatDialog
  ) {
    this.id_tipo_identificacion = new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]);
    this.identificacion = new FormControl('', Validators.required);
    this.nombre = new FormControl('', Validators.required);
    this.apellidos = new FormControl('', Validators.required);
    this.telefono = new FormControl('', Validators.required);
    this.correo = new FormControl('', [Validators.required, Validators.email]);
    this.estado = new FormControl<number | null>(1, Validators.required);
    this.direccion = new FormControl('', Validators.required);
    this.puesto = new FormControl('', Validators.required);

    this.formGuardar = new FormGroup({
      id_tipo_identificacion: this.id_tipo_identificacion,
      identificacion: this.identificacion,
      nombre: this.nombre,
      apellidos: this.apellidos,
      telefono: this.telefono,
      correo: this.correo,
      estado: this.estado,
      direccion: this.direccion,
      puesto: this.puesto,
    });
  }

  ngOnInit(): void {
    this.tipoIdServicio.Listar().subscribe({
      next: (lista) => {
        this.tipos = lista;
      },
      error: () => {
        this.tipos = [];
      },
    });
  }

  public guardar(): void {
    if (this.formGuardar.valid) {
      const idTipo = this.id_tipo_identificacion.value;
      if (idTipo == null || idTipo < 1) {
        return;
      }
      const emp = {
        tipo_identificacion: { id_tipo_identificacion: idTipo },
        identificacion: this.identificacion.value ?? '',
        nombre: this.nombre.value ?? '',
        apellidos: this.apellidos.value ?? '',
        telefono: this.telefono.value ?? '',
        correo: this.correo.value ?? '',
        estado: (this.estado.value ?? 1) === 1,
        direccion: this.direccion.value ?? '',
        puesto: this.puesto.value ?? '',
      };

      this.servicio.Guardar(emp).subscribe({
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
                mensaje: 'Se guardó correctamente el empleado.',
                tipo: 'exito',
              },
            });
            this.router.navigate(['/app/empleados']);
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
                mensaje: 'Ocurrió un problema al registrar el empleado.',
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
              mensaje: 'Ocurrió un problema al registrar el empleado.',
              tipo: 'error',
            },
          });
        },
      });
    }
  }
}
