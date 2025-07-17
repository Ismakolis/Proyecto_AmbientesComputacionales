// src/app/services/categoria.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Categoria {
  _id?: string;
  nombre: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private api: ApiService) {}

  obtenerCategorias(): Observable<Categoria[]> {
    return this.api.get<Categoria[]>('categorias');
  }

  crearCategoria(categoria: Categoria): Observable<any> {
    return this.api.post('categorias', categoria);
  }
}
