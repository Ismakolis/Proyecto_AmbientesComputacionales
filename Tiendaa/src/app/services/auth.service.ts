import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api'; 

  constructor(private http: HttpClient) {}

  getUsuarioSesion(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarioSesion`, {
      withCredentials: true 
    });

  }
}
