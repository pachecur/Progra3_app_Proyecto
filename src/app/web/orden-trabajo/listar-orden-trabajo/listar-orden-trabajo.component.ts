import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { IOrdenTrabajo } from '../../../shared/interfaces/iorden-trabajo';
import { IEstadoOrden } from '../../../shared/interfaces/iestado-orden';
import { OrdenTrabajoService } from '../../../shared/services/orden-trabajo.service';

@Component({
  selector: 'app-listar-orden-trabajo',
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './listar-orden-trabajo.component.html',
  styleUrl: './listar-orden-trabajo.component.css',
})
export class ListarOrdenTrabajo implements AfterViewInit {
  public columnas: string[] = [
    'id_orden_trabajo',
    'fecha',
    'empleado',
    'estado_orden',
    'total_horas',
    'estado',
    'descripcion',
    'acciones',
  ];

  public datos = new MatTableDataSource<IOrdenTrabajo>([]);

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenamiento!: MatSort;

  constructor(private servicio: OrdenTrabajoService) {
    this.datos.sortingDataAccessor = (item: IOrdenTrabajo, prop: string) => {
      switch (prop) {
        case 'fecha':
          return this.fechaOrden(item);
        case 'empleado':
          return this.textoEmpleado(item);
        case 'estado_orden':
          return this.textoEstadoOrden(item);
        case 'total_horas':
          return Number(item.total_horas);
        case 'estado':
          return Number(item.estado);
        case 'descripcion':
          return item.descripcion ?? '';
        default:
          return (item as unknown as Record<string, unknown>)[prop] as string | number;
      }
    };

    this.datos.filterPredicate = (data: IOrdenTrabajo, filter: string) => {
      const f = filter.trim().toLowerCase();
      if (!f) {
        return true;
      }
      const eo = this.estadoOrdenDe(data);
      const texto = [
        data.id_orden_trabajo,
        this.fechaOrden(data),
        this.textoEmpleado(data),
        eo?.nombre,
        eo?.id_estado_orden,
        data.total_horas,
        data.estado,
        this.etiquetaEstadoRegistro(data.estado),
        data.descripcion,
      ]
        .map((v) => String(v ?? '').toLowerCase())
        .join(' ');
      return texto.includes(f);
    };
  }

  ngAfterViewInit(): void {
    this.cargarTabla();
  }

  public fechaOrden(row: IOrdenTrabajo): string {
    const raw = row.fecha ?? '';
    return raw.length >= 10 ? raw.slice(0, 10) : raw;
  }

  public textoEmpleado(row: IOrdenTrabajo): string {
    const e = row.empleado;
    if (!e) {
      return '';
    }
    return `${e.nombre ?? ''} ${e.apellidos ?? ''}`.trim();
  }

  public estadoOrdenDe(row: IOrdenTrabajo): IEstadoOrden | undefined {
    return row.estadoOrden ?? row.estado_orden;
  }

  public textoEstadoOrden(row: IOrdenTrabajo): string {
    return this.estadoOrdenDe(row)?.nombre ?? '';
  }

  public etiquetaEstadoRegistro(valor: number): string {
    switch (Number(valor)) {
      case 0:
        return 'Inactiva';
      case 1:
        return 'Activa';
      default:
        return String(valor ?? '');
    }
  }

  private cargarTabla(): void {
    this.servicio.Listar().subscribe({
      next: (respuesta: IOrdenTrabajo[]) => {
        this.datos.data = respuesta;
        this.datos.paginator = this.paginador;
        this.datos.sort = this.ordenamiento;
      },
      error: (err: unknown) => {
        console.error(err);
      },
    });
  }

  public buscar(valor: string): void {
    this.datos.filter = valor.trim().toLowerCase();
    if (this.datos.paginator) {
      this.datos.paginator.firstPage();
    }
  }
}
