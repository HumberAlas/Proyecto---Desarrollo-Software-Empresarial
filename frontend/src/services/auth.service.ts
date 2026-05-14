import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  mensaje?: string;
  token: string;
  usuarioId?: string;
  idUsuario?: string;
  nombre?: string;
  correo?: string;
  rol?: string;
<<<<<<< HEAD
  metodoLogin?: string;
  usuario?: {
    id?: string;
    _id?: string;
=======
  usuario?: {
    id?: string;
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
    nombre?: string;
    correo?: string;
    rol?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/AutenticarUsuario`, {
      correo,
      password
    });
  }

  loginAdmin(correo: string, password: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/usuarios/AutenticarAdministrador`, {
    correo,
    password
  });
}

  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/CrearUsuario`, usuario);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  cerrarSesion(): void {
    localStorage.clear();
  }
<<<<<<< HEAD

  loginGoogle(idToken: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(
    `${this.apiUrl}/usuarios/AutenticarGoogle`,
    {
      idToken
    }
  );
}
=======
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
}