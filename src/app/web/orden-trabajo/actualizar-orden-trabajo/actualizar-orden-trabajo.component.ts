import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../shared/services/empleado.service';
import { EstadoOrdenService } from '../../../shared/services/estado-orden.service';
import { TareaService } from '../../../shared/services/tarea.service';
import { OrdenTrabajoService } from '../../../shared/services/orden-trabajo.service';
import { IEmpleado } from '../../../shared/interfaces/iempleado';
import { IEstadoOrden } from '../../../shared/interfaces/iestado-orden';
import { ITarea } from '../../../shared/interfaces/itarea';
import { IOrdenTrabajo } from '../../../shared/interfaces/iorden-trabajo';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-actualizar-orden-trabajo',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './actualizar-orden-trabajo.component.html',
  styleUrl: './actualizar-orden-trabajo.component.css',
})
export class ActualizarOrdenTrabajo implements OnInit {
  private id_orden_trabajo = 0;
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
    private route: ActivatedRoute,
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
    const id = this.route.snapshot.paramMap.get('id');
    this.id_orden_trabajo = id ? Number(id) : 0;

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

    this.servicio.consultar(this.id_orden_trabajo).subscribe({
      next: (resp: IOrdenTrabajo) => {
        if (resp?.id_orden_trabajo > 0) {
          this.aplicarRespuesta(resp);
        } else {
          this.mostrarNoEncontrado();
        }
      },
      error: () => this.mostrarNoEncontrado(),
    });
  }

  private aplicarRespuesta(resp: IOrdenTrabajo): void {
    const rawFecha = resp.fecha ?? '';
    const fechaInput = rawFecha.length >= 10 ? rawFecha.slice(0, 10) : rawFecha;
    const eo = resp.estadoOrden ?? resp.estado_orden;
    const idEo = eo?.id_estado_orden ?? null;

    this.formGuardar.patchValue({
      id_empleado: resp.empleado?.id_empleado ?? null,
      id_estado_orden: idEo,
      fecha: fechaInput,
      descripcion: resp.descripcion ?? '',
      total_horas: resp.total_horas ?? 0,
      estado: Number(resp.estado),
    });

    this.lineas.clear();
    for (const ot of resp.orden_trabajo_tareas ?? []) {
      const idT = ot.tarea?.id_tarea ?? null;
      this.lineas.push(
        this.fb.group({
          id_tarea: [idT],
          horas: [ot.horas ?? 0, [Validators.required, Validators.min(0)]],
          observacion: [ot.observacion ?? ''],
        })
      );
    }
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
        mensaje: 'No se encontró la orden de trabajo consultada.',
        tipo: 'advertencia',
      },
    });
    this.router.navigate(['/app/ordenes-trabajo']);
  }

  public actualizar(): void {
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
      id_orden_trabajo: this.id_orden_trabajo,
      empleado: { id_empleado: idEmp },
      estado_orden: { id_estado_orden: idEo },
      fecha: v.fecha,
      descripcion: v.descripcion ?? '',
      total_horas: Number(v.total_horas) >= 0 ? Number(v.total_horas) : 0,
      estado: Number(v.estado),
      tareas: tareasPayload,
    };

    this.servicio.Actualizar(body).subscribe({
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
              mensaje: 'Se actualizó correctamente la orden de trabajo.',
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
              mensaje: 'Ocurrió un problema al actualizar la orden de trabajo.',
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
            mensaje: 'Ocurrió un problema al actualizar la orden de trabajo.',
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
