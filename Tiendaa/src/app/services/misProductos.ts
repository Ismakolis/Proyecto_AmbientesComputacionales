import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Producto } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class MisProductosService {
  private endpoint = 'misProductos';

  constructor(private api: ApiService) {}

  getProductos(): Observable<any> {
    return this.api.get(`${this.endpoint}`);
  }

  eliminarProductos(id: String): Observable<any> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }

  guardarProductos(producto: Producto): Observable<any> {
    return this.api.post(this.endpoint, producto);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.api.get(`${this.endpoint}/${id}`);
  }

  editarPorducto(id: string, producto: Producto): Observable<any> {
    return this.api.put(`${this.endpoint}/${id}`, producto);
  }

  subirImagen(id: string, formData: FormData): Observable<any> {
    return this.api.uploadFormData(`${this.endpoint}/subir-imagen/${id}`, formData);
  }
}
