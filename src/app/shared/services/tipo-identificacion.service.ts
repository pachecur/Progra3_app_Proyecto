import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITipoIdentificacion } from '../interfaces/itipo-identificacion';

@Injectable({
  providedIn: 'root',
})
export class TipoIdentificacionService {
  constructor(private http: HttpClient) {}

  public Listar(): Observable<ITipoIdentificacion[]> {
    return this.http.get<ITipoIdentificacion[]>(`${environment.api}/tipo-identificacion/listar`);
  }

  public consultar(id: number): Observable<ITipoIdentificacion> {
    return this.http.get<ITipoIdentificacion>(`${environment.api}/tipo-identificacion/consultar/${id}`);
  }

  public Guardar(tipoIdentificacion: ITipoIdentificacion): Observable<number> {
    return this.http.post<number>(`${environment.api}/tipo-identificacion/guardar`, tipoIdentificacion);
  }

  public Actualizar(tipoIdentificacion: ITipoIdentificacion): Observable<number> {
    return this.http.put<number>(`${environment.api}/tipo-identificacion/actualizar`, tipoIdentificacion);
  }
}
