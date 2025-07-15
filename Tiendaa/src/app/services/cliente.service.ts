import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:4000/api/clientes';

  constructor(private http: HttpClient) {}

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl, { withCredentials: true });
  }

  obtenerPorRol(rol: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/rol/${rol}`, { withCredentials: true });
  }

  actualizarCliente(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente, { withCredentials: true });
  }

  eliminarCliente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
