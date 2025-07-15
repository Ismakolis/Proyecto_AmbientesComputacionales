import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  correo: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL = 'http://localhost:4000/api/loginUser';

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string): Observable<any> {
    const body = { correo, contrasena };
    return this.http.post(`${this.URL}/login`, body, {
      withCredentials: true
    });
  }
  getUsuarioSesion(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.URL}/usuarioSesion`, { withCredentials: true });
  }


  }
