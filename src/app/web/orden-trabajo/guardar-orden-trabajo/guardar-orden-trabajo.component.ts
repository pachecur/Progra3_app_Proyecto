import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService } from '../../../shared/services/empleado.service';
import { EstadoOrdenService } from '../../../shared/services/estado-orden.service';
import { TareaService } from '../../../shared/services/tarea.service';
import { OrdenTrabajoService } from '../../../shared/services/orden-trabajo.service';
import { IEmpleado } from '../../../shared/interfaces/iempleado';
import { IEstadoOrden } from '../../../shared/interfaces/iestado-orden';
import { ITarea } from '../../../shared/interfaces/itarea';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-guardar-orden-trabajo',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './guardar-orden-trabajo.component.html',
  styleUrl: './guardar-orden-trabajo.component.css',
})
export class GuardarOrdenTrabajo implements OnInit {
  public empleados: IEmpleado[] = [];
  public estadosOrden: IEstadoOrden[] = [];
  public tareas: ITarea[] = [];

  public readonly formGuardar: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicio: OrdenTrabajoService,
    private empleadoServicio: EmpleadoService,
    private estadoOrdenServicio: EstadoOrdenService,
    private tareaServicio: TareaService,
    private router: Router,
    private dialogo: MatDialog
  ) {
    this.formGuardar = this.fb.group({
      id_empleado: [null as number | null, [Validators.required, Validators.min(1)]],
      id_estado_orden: [null as number | null, [Validators.required, Validators.min(1)]],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      total_horas: [0, [Validators.required, Validators.min(0)]],
      estado: [1, Validators.required],
      lineas: this.fb.array<FormGroup>([]),
    });
  }

  public get lineas(): FormArray {
    return this.formGuardar.get('lineas') as FormArray;
  }

  ngOnInit(): void {
    this.empleadoServicio.Listar().subscribe({
      next: (lista) => {
        this.empleados = lista;
      },
      error: () => {
        this.empleados = [];
      },
    });
    this.estadoOrdenServicio.Listar().subscribe({
      next: (lista) => {
        this.estadosOrden = lista;
      },
      error: () => {
        this.estadosOrden = [];
      },
    });
    this.tareaServicio.Listar().subscribe({
      next: (lista) => {
        this.tareas = lista;
      },
      error: () => {
        this.tareas = [];
      },
    });
  }

  private crearLineaGrupo(): FormGroup {
    return this.fb.group({
      id_tarea: [null as number | null],
      horas: [0, [Validators.required, Validators.min(0)]],
      observacion: [''],
    });
  }

  public agregarLinea(): void {
    this.lineas.push(this.crearLineaGrupo());
  }

  public quitarLinea(i: number): void {
    this.lineas.removeAt(i);
  }

  public guardar(): void {
    this.formGuardar.markAllAsTouched();
    if (this.formGuardar.invalid) {
      return;
    }

    const v = this.formGuardar.getRawValue() as {
      id_empleado: number | null;
      id_estado_orden: number | null;
      fecha: string;
      descripcion: string;
      total_horas: number;
      estado: number;
    };

    const idEmp = v.id_empleado;
    const idEo = v.id_estado_orden;
    if (idEmp == null || idEmp < 1 || idEo == null || idEo < 1) {
      return;
    }

    const tareasPayload = this.construirTareasDesdeLineas();
    const body: Record<string, unknown> = {
      empleado: { id_empleado: idEmp },
      estado_orden: { id_estado_orden: idEo },
      fecha: v.fecha,
      descripcion: v.descripcion ?? '',
      total_horas: Number(v.total_horas) >= 0 ? Number(v.total_horas) : 0,
      estado: Number(v.estado),
    };
    if (tareasPayload.length > 0) {
      body['tareas'] = tareasPayload;
    }

    this.servicio.Guardar(body).subscribe({
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
              mensaje: 'Se guardó correctamente la orden de trabajo.',
              tipo: 'exito',
            },
          });
          this.router.navigate(['/app/ordenes-trabajo']);
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
              mensaje: 'Ocurrió un problema al registrar la orden de trabajo.',
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
            mensaje: 'Ocurrió un problema al registrar la orden de trabajo.',
            tipo: 'error',
          },
        });
      },
    });
  }

  private construirTareasDesdeLineas(): { tarea: { id_tarea: number }; horas: number; observacion?: string }[] {
    return (this.lineas.controls as FormGroup[])
      .map((g) => g.getRawValue() as { id_tarea: number | null; horas: number; observacion: string })
      .filter((row) => row.id_tarea != null && row.id_tarea >= 1)
      .map((row) => {
        const horas = Number(row.horas) >= 0 ? Number(row.horas) : 0;
        const obs = row.observacion?.trim();
        const base = { tarea: { id_tarea: row.id_tarea as number }, horas };
        return obs ? { ...base, observacion: obs } : base;
      });
  }
}
