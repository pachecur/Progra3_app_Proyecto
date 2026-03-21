import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEstudiante } from '../interfaces/iestudiante';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  public Listar(): Observable<IEstudiante[]> {
    return this.http.get<IEstudiante[]>(`${environment.api}/estudiante/listar`);
  }

  public consultar(id: number): Observable<IEstudiante> {
    return this.http.get<IEstudiante>(`${environment.api}/estudiante/consultar/${id}`);
  }

  public Guardar(tipoIdentificacion: IEstudiante): Observable<IEstudiante> {
    return this.http.post<IEstudiante>(`${environment.api}/estudiante/guardar`, tipoIdentificacion);
  }

  public Actualizar(tipoIdentificacion: IEstudiante): Observable<IEstudiante> {
    return this.http.put<IEstudiante>(`${environment.api}/estudiante/actualizar`, tipoIdentificacion);
  }
}
