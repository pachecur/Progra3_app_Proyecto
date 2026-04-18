import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TipoIdentificacionService } from '../../../shared/services/tipo-identificacion.service';
import { ITipoIdentificacion } from '../../../shared/interfaces/itipo-identificacion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-listar-tipo-identificacion',
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './listar-tipo-identificacion.component.html',
  styleUrl: './listar-tipo-identificacion.component.css',
})
export class ListarTipoIdentificacion implements AfterViewInit {
  // Definir las columnas de nuestra tabla.
  public columnas: string[] = [
    "id_tipo_identificacion",
    "nombre",
    "mascara",
    "acciones"
  ];

  public datos = new MatTableDataSource<ITipoIdentificacion>();

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenamiento!: MatSort; 

  constructor(private servicio: TipoIdentificacionService) {}

  ngAfterViewInit(): void {
    this.cargarTabla();
  }

  private cargarTabla(): void {
    this.servicio.Listar().subscribe({
      next: (respuesta: ITipoIdentificacion[]) => {
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
    this.datos.filter = valor.trim().toLocaleLowerCase();
    if(this.datos.paginator) {
      this.datos.paginator.firstPage();
    }
  }
}
