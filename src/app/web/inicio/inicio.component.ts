import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dashboard } from '../../shared/services/dashboard.service';
import { IDashboardResumen } from '../../shared/interfaces/idashboard';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class Inicio implements OnInit {
  public resumen = signal<IDashboardResumen | null>(null);
  public cargando = signal<boolean>(true);

  constructor(private servicio: Dashboard) {}

  public ngOnInit(): void {
    this.servicio.Resumen().subscribe({
      next: (resp) => {
        this.resumen.set(resp);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      },
    });
  }
}
