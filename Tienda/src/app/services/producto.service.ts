import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  descripcion:string,
  stock:number;
  imagen: string;
  oferta:number;
  categoriaId: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos/'

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }


  obtenerPorCategoria(id: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`http://localhost:4000/api/productos/categoria/${id}`);
  }
}
