import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class registroService {
  private endpoint = 'registroUser';

  constructor(private api: ApiService) {}

  registrarUsuario(usuario: { correo: string; contrasena: string; nombre: string; apellido: string; telefono?: string }): Observable<any> {
    return this.api.post(`${this.endpoint}/register`, usuario);
  }

  actualizarCliente(id: string, data: any): Observable<any> {
    return this.api.put(`${this.endpoint}/update/${id}`, data);
  }

  obtenerClientePorId(id: string): Observable<any> {
    return this.api.get(`${this.endpoint}/get/${id}`);
  }
}