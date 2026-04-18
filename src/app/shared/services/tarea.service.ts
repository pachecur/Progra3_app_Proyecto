import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ITarea } from '../interfaces/itarea';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(private http: HttpClient) {}

  public Listar(): Observable<ITarea[]> {
    return this.http.get<ITarea[]>(`${environment.api}/tarea/listar`);
  }

  public consultar(id: number): Observable<ITarea> {
    return this.http.get<ITarea>(`${environment.api}/tarea/consultar/${id}`);
  }

  public Guardar(tarea: object): Observable<number> {
    return this.http.post<number>(`${environment.api}/tarea/guardar`, tarea);
  }

  public Actualizar(tarea: object): Observable<number> {
    return this.http.put<number>(`${environment.api}/tarea/actualizar`, tarea);
  }

  public Estado(id: number, estado: boolean): Observable<number> {
    return this.http.patch<number>(`${environment.api}/tarea/estado`, { id_tarea: id, estado });
  }
}
