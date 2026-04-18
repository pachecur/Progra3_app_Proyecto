import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IEstadoOrden } from '../interfaces/iestado-orden';

@Injectable({
  providedIn: 'root',
})
export class EstadoOrdenService {
  constructor(private http: HttpClient) {}

  public Listar(): Observable<IEstadoOrden[]> {
    return this.http.get<IEstadoOrden[]>(`${environment.api}/estado-orden/listar`);
  }

  public consultar(id: number): Observable<IEstadoOrden> {
    return this.http.get<IEstadoOrden>(`${environment.api}/estado-orden/consultar/${id}`);
  }

  public Guardar(estadoOrden: IEstadoOrden): Observable<number> {
    return this.http.post<number>(`${environment.api}/estado-orden/guardar`, estadoOrden);
  }

  public Actualizar(estadoOrden: IEstadoOrden): Observable<number> {
    return this.http.put<number>(`${environment.api}/estado-orden/actualizar`, estadoOrden);
  }
}
