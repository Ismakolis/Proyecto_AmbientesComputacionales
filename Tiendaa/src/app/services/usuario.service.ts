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
export class UsuarioService {
  private endpoint = 'usuarios';

  constructor(private api: ApiService) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.api.get<Usuario[]>(this.endpoint);
  }

  getUsuarioPorCorreo(correo: string): Observable<Usuario> {
    return this.api.get<Usuario>(`${this.endpoint}/${correo}`);
  }
}