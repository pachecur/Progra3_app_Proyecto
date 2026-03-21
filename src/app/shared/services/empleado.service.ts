import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpleado } from '../interfaces/iempleado';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  public Listar(): Observable<IEmpleado[]> {
    return this.http.get<IEmpleado[]>(`${environment.api}/empleados/listar`);
  }

  public consultar(id: number): Observable<IEmpleado> {
    return this.http.get<IEmpleado>(`${environment.api}/empleados/consultar/${id}`);
  }

  public Guardar(tipoIdentificacion: IEmpleado): Observable<IEmpleado> {
    return this.http.post<IEmpleado>(`${environment.api}/empleados/guardar`, tipoIdentificacion);
  }

  public Actualizar(tipoIdentificacion: IEmpleado): Observable<IEmpleado> {
    return this.http.put<IEmpleado>(`${environment.api}/empleados/actualizar`, tipoIdentificacion);
  }
}
