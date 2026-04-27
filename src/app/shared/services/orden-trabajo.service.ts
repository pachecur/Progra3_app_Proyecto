import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IOrdenTrabajo } from '../interfaces/iorden-trabajo';

@Injectable({
  providedIn: 'root',
})
export class OrdenTrabajoService {
  constructor(private http: HttpClient) {}

  public Listar(): Observable<IOrdenTrabajo[]> {
    return this.http.get<IOrdenTrabajo[]>(`${environment.api}/orden-trabajo/listar`);
  }

  public consultar(id: number): Observable<IOrdenTrabajo> {
    return this.http.get<IOrdenTrabajo>(`${environment.api}/orden-trabajo/consultar/${id}`);
  }

  public Guardar(orden: object): Observable<number> {
    return this.http.post<number>(`${environment.api}/orden-trabajo/guardar`, orden);
  }

  public Actualizar(orden: object): Observable<number> {
    return this.http.put<number>(`${environment.api}/orden-trabajo/actualizar`, orden);
  }
}
