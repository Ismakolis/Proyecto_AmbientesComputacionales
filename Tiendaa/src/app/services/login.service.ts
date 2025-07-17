import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

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
  private endpoint = 'loginUser';

  constructor(private api: ApiService) {}

  login(correo: string, contrasena: string): Observable<any> {
    return this.api.post(`${this.endpoint}/login`, { correo, contrasena });
  }

  getUsuarioSesion(): Observable<Usuario> {
    return this.api.get<Usuario>(`${this.endpoint}/usuarioSesion`);
  }
}
