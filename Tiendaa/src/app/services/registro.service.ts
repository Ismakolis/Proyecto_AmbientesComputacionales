import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class registroService {
  private apiUrl = 'http://localhost:4000/api/registroUser';

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: { correo: string; contrasena: string; nombre: string; apellido: string; telefono?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }
  actualizarCliente(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }
  
  obtenerClientePorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }
  
  }
  

