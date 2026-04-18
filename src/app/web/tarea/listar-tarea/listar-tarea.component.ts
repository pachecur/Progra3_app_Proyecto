import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ITarea } from '../../../shared/interfaces/itarea';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';
import { TareaService } from '../../../shared/services/tarea.service';
import { tiempoApiAInput } from '../../../shared/utils/tiempo-formulario';

@Component({
  selector: 'app-listar-tarea',
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './listar-tarea.component.html',
  styleUrl: './listar-tarea.component.css',
})
export class ListarTarea implements AfterViewInit {
  public columnas: string[] = [
    'id_tarea',
    'nombre',
    'descripcion',
    'hora_inicio',
    'hora_fin',
    'estado',
    'acciones',
  ];

  public datos = new MatTableDataSource<ITarea>([]);

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenamiento!: MatSort;

  constructor(
    private servicio: TareaService,
    private dialogo: MatDialog
  ) {
    this.datos.sortingDataAccessor = (item: ITarea, prop: string) => {
      switch (prop) {
        case 'hora_inicio':
        case 'hora_fin':
          return tiempoApiAInput(item[prop as keyof ITarea]);
        case 'estado':
          return Number(item.estado);
        default:
          return (item as unknown as Record<string, unknown>)[prop] as string | number;
      }
    };

    this.datos.filterPredicate = (data: ITarea, filter: string) => {
      const f = filter.trim().toLowerCase();
      if (!f) {
        return true;
      }
      const texto = [
        data.id_tarea,
        data.nombre,
        data.descripcion,
        tiempoApiAInput(data.hora_inicio),
        tiempoApiAInput(data.hora_fin),
        data.estado,
        this.etiquetaEstado(data.estado),
      ]
        .map((v) => String(v ?? '').toLowerCase())
        .join(' ');
      return texto.includes(f);
    };
  }

  ngAfterViewInit(): void {
    this.cargarTabla();
  }

  public mostrarHora(valor: unknown): string {
    return tiempoApiAInput(valor);
  }

  public etiquetaEstado(valor: number): string {
    switch (Number(valor)) {
      case 0:
        return 'Inactiva';
      case 1:
        return 'Activa';
      default:
        return String(valor ?? '');
    }
  }

  public cambiarEstado(tarea: ITarea): void {
    const activo = tarea.estado === 1;
    const accion = activo ? 'desactivar' : 'activar';
    const nuevoEstado = !activo;

    const confirmRef = this.dialogo.open(Mensaje, {
      width: '100%',
      maxWidth: '420px',
      height: 'auto',
      disableClose: true,
      hasBackdrop: true,
      data: {
        titulo: activo ? 'Desactivar tarea' : 'Activar tarea',
        mensaje: `¿Desea ${accion} la tarea "${tarea.nombre}"?`,
        confirmacion: true,
      },
    });

    confirmRef.afterClosed().subscribe((confirmado: boolean) => {
      if (!confirmado) return;

      this.servicio.Estado(tarea.id_tarea, nuevoEstado).subscribe({
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
                mensaje: `La tarea fue ${nuevoEstado ? 'activada' : 'desactivada'} correctamente.`,
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
      next: (respuesta: ITarea[]) => {
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
