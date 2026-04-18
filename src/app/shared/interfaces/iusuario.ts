export interface IUsuario {
  id_usuario: number;
  nombre: string;
  apellidos: string;
  acceso: string;
  secreto?: string;
  estado?: number;
}

export interface ILoginRequest {
  acceso: string;
  secreto: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  usuario: IUsuario;
}
