import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILoginRequest, ILoginResponse, IUsuario } from '../interfaces/iusuario';

const TOKEN_KEY = 'p3.token';
const USUARIO_KEY = 'p3.usuario';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  public usuarioActual = signal<IUsuario | null>(this.leerUsuarioStorage());

  constructor(private http: HttpClient) {}

  public Login(credenciales: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${environment.api}/auth/login`, credenciales).pipe(
      tap((resp) => {
        localStorage.setItem(TOKEN_KEY, resp.access_token);
        localStorage.setItem(USUARIO_KEY, JSON.stringify(resp.usuario));
        this.usuarioActual.set(resp.usuario);
      })
    );
  }

  public Logout(): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${environment.api}/auth/logout`, {}).pipe(
      tap(() => this.limpiarSesion())
    );
  }

  public Me(): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${environment.api}/auth/me`, {}).pipe(
      tap((user) => {
        localStorage.setItem(USUARIO_KEY, JSON.stringify(user));
        this.usuarioActual.set(user);
      })
    );
  }

  public Refresh(): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${environment.api}/auth/refresh`, {}).pipe(
      tap((resp) => {
        localStorage.setItem(TOKEN_KEY, resp.access_token);
        localStorage.setItem(USUARIO_KEY, JSON.stringify(resp.usuario));
        this.usuarioActual.set(resp.usuario);
      })
    );
  }

  public obtenerToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  public limpiarSesion(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
    this.usuarioActual.set(null);
  }

  private leerUsuarioStorage(): IUsuario | null {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(USUARIO_KEY) : null;
    if (!raw) return null;
    try {
      return JSON.parse(raw) as IUsuario;
    } catch {
      return null;
    }
  }
}
