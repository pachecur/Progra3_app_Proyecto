import { Component, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '../../services/auth';
import { Mensaje } from '../mensaje/mensaje';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public usuario = computed(() => {
    const u = this.auth.usuarioActual();
    if (!u) return 'Usuario';
    return `${u.nombre} ${u.apellidos}`.trim() || u.acceso;
  });

  constructor(
    private auth: Auth,
    private router: Router,
    private dialogo: MatDialog
  ) {}

  public logout(): void {
    this.auth.Logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        this.auth.limpiarSesion();
        this.router.navigate(['/login']);
        this.dialogo.open(Mensaje, {
          width: '100%',
          maxWidth: '500px',
          height: 'auto',
          maxHeight: '700px',
          disableClose: true,
          hasBackdrop: true,
          data: {
            titulo: 'Aviso',
            mensaje: 'La sesión fue cerrada localmente.',
            tipo: 'info',
          },
        });
      },
    });
  }
}
