import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { EstadoOrdenService } from '../../../shared/services/estado-orden.service';
import { IEstadoOrden } from '../../../shared/interfaces/iestado-orden';

@Component({
  selector: 'app-listar-estado-orden',
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './listar-estado-orden.component.html',
  styleUrl: './listar-estado-orden.component.css',
})
export class ListarEstadoOrden implements AfterViewInit {
  public columnas: string[] = ['id_estado_orden', 'nombre', 'acciones'];

  public datos = new MatTableDataSource<IEstadoOrden>([]);

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenamiento!: MatSort;

  constructor(private servicio: EstadoOrdenService) {
    this.datos.filterPredicate = (data: IEstadoOrden, filter: string) => {
      const f = filter.trim().toLowerCase();
      if (!f) {
        return true;
      }
      const texto = [data.id_estado_orden, data.nombre]
        .map((v) => String(v ?? '').toLowerCase())
        .join(' ');
      return texto.includes(f);
    };
  }

  ngAfterViewInit(): void {
    this.cargarTabla();
  }

  private cargarTabla(): void {
    this.servicio.Listar().subscribe({
      next: (respuesta: IEstadoOrden[]) => {
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
