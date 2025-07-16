import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imagen: string;
  oferta: number;
  categoriaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private endpoint = 'productos';

  constructor(private api: ApiService) {}

  getProductos(): Observable<any> {
    return this.api.get(`${this.endpoint}`);
  }

  obtenerPorCategoria(id: string): Observable<Producto[]> {
    return this.api.get<Producto[]>(`${this.endpoint}/categoria/${id}`);
  }
}