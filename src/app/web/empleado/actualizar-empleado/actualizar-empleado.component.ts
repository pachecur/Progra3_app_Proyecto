import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';
import { IEmpleado } from '../../../shared/interfaces/iempleado';
import { ITipoIdentificacion } from '../../../shared/interfaces/itipo-identificacion';
import { EmpleadoService } from '../../../shared/services/empleado.service';
import { TipoIdentificacionService } from '../../../shared/services/tipo-identificacion.service';

@Component({
  selector: 'app-actualizar-empleado',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './actualizar-empleado.component.html',
  styleUrl: './actualizar-empleado.component.css',
})
export class ActualizarEmpleado implements OnInit {
  private id_empleado = 0;
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
    private route: ActivatedRoute,
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
    this.estado = new FormControl<number | null>(null, Validators.required);
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
    const id = this.route.snapshot.paramMap.get('id');
    this.id_empleado = id ? Number(id) : 0;

    this.tipoIdServicio.Listar().subscribe({
      next: (lista) => {
        this.tipos = lista;
      },
      error: () => {
        this.tipos = [];
      },
    });

    this.servicio.consultar(this.id_empleado).subscribe({
      next: (resp: IEmpleado) => {
        if (resp?.id_empleado > 0) {
          const idTipo = resp.tipo_identificacion?.id_tipo_identificacion ?? resp.id_tipo_identificacion;
          this.id_tipo_identificacion.setValue(idTipo ?? null);
          this.identificacion.setValue(resp.identificacion);
          this.nombre.setValue(resp.nombre);
          this.apellidos.setValue(resp.apellidos);
          this.telefono.setValue(resp.telefono);
          this.correo.setValue(resp.correo);
          this.estado.setValue(resp.estado);
          this.direccion.setValue(resp.direccion);
          this.puesto.setValue(resp.puesto);
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
        mensaje: 'No se encontró el empleado consultado.',
        tipo: 'advertencia',
      },
    });
    this.router.navigate(['/app/empleados']);
  }

  public actualizar(): void {
    if (this.formGuardar.valid) {
      const emp = {
        id_empleado: this.id_empleado,
        tipo_identificacion: { id_tipo_identificacion: this.id_tipo_identificacion.value ?? 0 },
        identificacion: this.identificacion.value ?? '',
        nombre: this.nombre.value ?? '',
        apellidos: this.apellidos.value ?? '',
        telefono: this.telefono.value ?? '',
        correo: this.correo.value ?? '',
        estado: this.estado.value ?? 1,
        direccion: this.direccion.value ?? '',
        puesto: this.puesto.value ?? '',
      };

      this.servicio.Actualizar(emp).subscribe({
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
                mensaje: 'Se actualizó correctamente el empleado.',
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
                mensaje: 'Ocurrió un problema al actualizar el empleado.',
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
              mensaje: 'Ocurrió un problema al actualizar el empleado.',
              tipo: 'error',
            },
          });
        },
      });
    }
  }
}
