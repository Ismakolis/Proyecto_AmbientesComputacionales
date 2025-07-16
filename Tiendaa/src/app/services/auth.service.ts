import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

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
  constructor(private api: ApiService) {}

  getUsuarioSesion(): Observable<Usuario> {
    return this.api.get<Usuario>('usuarioSesion');
  }
}
