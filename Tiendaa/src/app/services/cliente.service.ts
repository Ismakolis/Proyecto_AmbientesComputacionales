import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Cliente {
  _id?: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private endpoint = 'clientes';

  constructor(private api: ApiService) {}

  obtenerClientes(): Observable<Cliente[]> {
    return this.api.get<Cliente[]>(this.endpoint);
  }

  obtenerPorRol(rol: string): Observable<Cliente[]> {
    return this.api.get<Cliente[]>(`${this.endpoint}/rol/${rol}`);
  }

  actualizarCliente(id: string, cliente: Cliente): Observable<Cliente> {
    return this.api.put<Cliente>(`${this.endpoint}/${id}`, cliente);
  }

  eliminarCliente(id: string): Observable<any> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }
}
