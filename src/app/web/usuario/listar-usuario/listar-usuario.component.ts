import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../shared/services/usuario.service';
import { IUsuario } from '../../../shared/interfaces/iusuario';
import { Mensaje } from '../../../shared/components/mensaje/mensaje';

@Component({
  selector: 'app-listar-usuario',
  imports: [RouterLink, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css',
})
export class ListarUsuario implements AfterViewInit {
  public columnas: string[] = ['id_usuario', 'nombre', 'apellidos', 'acceso', 'estado', 'acciones'];

  public datos = new MatTableDataSource<IUsuario>([]);

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) ordenamiento!: MatSort;

  constructor(private servicio: Usuario, private dialogo: MatDialog) {}

  ngAfterViewInit(): void {
    this.cargarTabla();
  }

  private cargarTabla(): void {
    this.servicio.Listar().subscribe({
      next: (respuesta: IUsuario[]) => {
        this.datos.data = respuesta;
        this.datos.paginator = this.paginador;
        this.datos.sort = this.ordenamiento;
      },
      error: (err) => console.error(err),
    });
  }

  public buscar(valor: string): void {
    this.datos.filter = valor.trim().toLocaleLowerCase();
    if (this.datos.paginator) {
      this.datos.paginator.firstPage();
    }
  }

  public cambiarEstado(usuario: IUsuario): void {
    const activo = usuario.estado === 1;
    const accion = activo ? 'desactivar' : 'activar';
    const nuevoEstado = activo ? 0 : 1;

    const confirmRef = this.dialogo.open(Mensaje, {
      width: '100%',
      maxWidth: '420px',
      height: 'auto',
      disableClose: true,
      hasBackdrop: true,
      data: {
        titulo: activo ? 'Desactivar Usuario' : 'Activar Usuario',
        mensaje: `¿Desea ${accion} al usuario "${usuario.acceso}"?`,
        confirmacion: true,
      },
    });

    confirmRef.afterClosed().subscribe((confirmado: boolean) => {
      if (!confirmado) return;

      const payload: IUsuario = {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        acceso: usuario.acceso,
        estado: nuevoEstado,
      };

      this.servicio.Estado(payload).subscribe({
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
                mensaje: `El usuario fue ${nuevoEstado === 1 ? 'activado' : 'desactivado'} correctamente.`,
                tipo: 'exito',
              },
            });
            this.cargarTabla();
          } else {
            this.dialogo.open(Mensaje, {
              width: '100%',
              maxWidth: '420px',
              height: 'auto',
              disableClose: true,
              hasBackdrop: true,
              data: {
                titulo: 'Aviso',
                mensaje: `Ocurrió un problema al ${accion} el usuario.`,
                tipo: 'error',
              },
            });
          }
        },
      });
    });
  }
}
