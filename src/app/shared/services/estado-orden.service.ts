import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IEstadoOrden } from '../interfaces/iestado-orden';

@Injectable({
  providedIn: 'root'
})
export class EstadoOrdenService {

  constructor(private http: HttpClient) { }

  public Listar(): Observable<IEstadoOrden[]> {
    return this.http.get<IEstadoOrden[]>(`${environment.api}/estados-orden/listar`);
  }

  public consultar(id: number): Observable<IEstadoOrden> {
    return this.http.get<IEstadoOrden>(`${environment.api}/estados-orden/consultar/${id}`);
  }

  public Guardar(tipoIdentificacion: IEstadoOrden): Observable<IEstadoOrden> {
    return this.http.post<IEstadoOrden>(`${environment.api}/estados-orden/guardar`, tipoIdentificacion);
  }

  public Actualizar(tipoIdentificacion: IEstadoOrden): Observable<IEstadoOrden> {
    return this.http.put<IEstadoOrden>(`${environment.api}/estados-orden/actualizar`, tipoIdentificacion);
  }
}
