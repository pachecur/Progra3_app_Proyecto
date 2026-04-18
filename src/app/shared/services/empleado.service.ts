import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpleado } from '../interfaces/iempleado';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  public Listar(): Observable<IEmpleado[]> {
    return this.http.get<IEmpleado[]>(`${environment.api}/empleado/listar`);
  }

  public consultar(id: number): Observable<IEmpleado> {
    return this.http.get<IEmpleado>(`${environment.api}/empleado/consultar/${id}`);
  }

  public Guardar(empleado: Record<string, unknown>): Observable<number> {
    return this.http.post<number>(`${environment.api}/empleado/guardar`, empleado);
  }

  public Actualizar(empleado: Record<string, unknown>): Observable<number> {
    return this.http.put<number>(`${environment.api}/empleado/actualizar`, empleado);
  }

  public Estado(id: number, estado: boolean): Observable<number> {
    return this.http.patch<number>(`${environment.api}/empleado/estado`, { id_empleado: id, estado });
  }
}
