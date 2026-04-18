import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IDashboardResumen } from '../interfaces/idashboard';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  constructor(private http: HttpClient) {}

  public Resumen(): Observable<IDashboardResumen> {
    return this.http.get<IDashboardResumen>(`${environment.api}/dashboard/resumen`);
  }
}
