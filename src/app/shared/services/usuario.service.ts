import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUsuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root',
})
export class Usuario {
  constructor(private http: HttpClient) {}

  public Listar(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${environment.api}/usuario/listar`);
  }

  public Consultar(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${environment.api}/usuario/consultar/${id}`);
  }

  public Guardar(usuario: IUsuario): Observable<number> {
    return this.http.post<number>(`${environment.api}/usuario/guardar`, usuario);
  }

  public Actualizar(usuario: IUsuario): Observable<number> {
    return this.http.put<number>(`${environment.api}/usuario/actualizar`, usuario);
  }

  public Estado(usuario: IUsuario): Observable<number> {
    return this.http.patch<number>(`${environment.api}/usuario/estado`, usuario);
  }
}
