import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {ITarea} from '../interfaces/itarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http: HttpClient) { }

  public Listar(): Observable<ITarea[]> {
    return this.http.get<ITarea[]>(`${environment.api}/tareas/listar`);
  }

  public consultar(id: number): Observable<ITarea> {
    return this.http.get<ITarea>(`${environment.api}/tareas/consultar/${id}`);
  }

  public Guardar(tipoIdentificacion: ITarea): Observable<ITarea> {
    return this.http.post<ITarea>(`${environment.api}/tareas/guardar`, tipoIdentificacion);
  }

  public Actualizar(tipoIdentificacion: ITarea): Observable<ITarea> {
    return this.http.put<ITarea>(`${environment.api}/tareas/actualizar`, tipoIdentificacion);
  }
}
