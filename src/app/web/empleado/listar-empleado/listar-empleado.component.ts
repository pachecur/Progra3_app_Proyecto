import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService } from '../../../shared/services/empleado.service';
import { IEmpleado } from '../../../shared/interfaces/iempleado';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-listar-empleado',
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './listar-empleado.component.html',
  styleUrl: './listar-empleado.component.css',
})
export class ListarEmpleado implements AfterViewInit {
  public columnas: string[] = [
    'id_empleado',
    'identificacion',
    'nombre',
    'apellidos',
    'correo',
    'puesto',
    'estado',
    'acciones',
  ];

  public datos = new MatTableDataSource<IEmpleado>([]);

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenamiento!: MatSort;

  constructor(
    private servicio: EmpleadoService,
    private dialogo: MatDialog
  ) {
    this.datos.filterPredicate = (data: IEmpleado, filter: string) => {
      const f = filter.trim().toLowerCase();
      if (!f) {
        return true;
      }
      const tipo = data.tipo_identificacion;
      const texto = [
        data.id_empleado,
        data.id_tipo_identificacion,
        tipo?.id_tipo_identificacion,
        tipo?.nombre,
        tipo?.mascara,
        data.identificacion,
        data.nombre,
        data.apellidos,
        data.telefono,
        data.correo,
        data.estado,
        data.direccion,
        data.puesto,
      ]
        .map((v) => String(v ?? '').toLowerCase())
        .join(' ');
      return texto.includes(f);
    };
  }

  ngAfterViewInit(): void {
    this.cargarTabla();
  }

  public buscar(valor: string): void {
    this.datos.filter = valor.trim().toLowerCase();
    if (this.datos.paginator) {
      this.datos.paginator.firstPage();
    }
  }

  public cambiarEstado(empleado: IEmpleado): void {
    const activo = empleado.estado === 1;
    const accion = activo ? 'desactivar' : 'activar';
    const nuevoEstado = !activo;

    const confirmRef = this.dialogo.open(Mensaje, {
      width: '100%',
      maxWidth: '420px',
      height: 'auto',
      disableClose: true,
      hasBackdrop: true,
      data: {
        titulo: activo ? 'Desactivar empleado' : 'Activar empleado',
        mensaje: `¿Desea ${accion} a ${empleado.nombre} ${empleado.apellidos}?`,
        confirmacion: true,
      },
    });

    confirmRef.afterClosed().subscribe((confirmado: boolean) => {
      if (!confirmado) return;

      this.servicio.Estado(empleado.id_empleado, nuevoEstado).subscribe({
        next: (resp: number) => {
          if (resp > 0) {
            this.dialogo.open(Mensaje, {
              width: '100%',
              maxWidth: '420px',
              height: 'auto',
              disableClose: true,
              hasBackdrop: true,
              data: {
                titulo: 'Aviso',
                mensaje: `El empleado fue ${nuevoEstado ? 'activado' : 'desactivado'} correctamente.`,
                tipo: 'exito',
              },
            });
            this.cargarTabla();
          }
        },
      });
    });
  }

  private cargarTabla(): void {
    this.servicio.Listar().subscribe({
      next: (respuesta: IEmpleado[]) => {
        this.datos.data = respuesta;
        this.datos.paginator = this.paginador;
        this.datos.sort = this.ordenamiento;
      },
      error: (err: unknown) => {
        console.error(err);
      },
    });
  }

  public etiquetaEstado(val: unknown): string {
    const s = String(val ?? '')
      .trim()
      .toLowerCase();
    if (s === 'activo' || s === '1') {
      return 'Activo';
    }
    if (s === 'inactivo' || s === '0') {
      return 'Inactivo';
    }
    const n = Number(val);
    if (n === 1) {
      return 'Activo';
    }
    if (n === 0) {
      return 'Inactivo';
    }
    return '-';
  }
}
