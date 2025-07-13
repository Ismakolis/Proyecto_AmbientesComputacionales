import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class MisProductosService {
  url = 'http://localhost:4000/api/misProductos/'

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarProductos(id:String): Observable<any>{
    return this.http.delete(this.url + id);
  }

  guardarProductos(producto: Producto):Observable<any>{
    return  this.http.post(this.url, producto);
  }
  obtenerProducto(id:string):Observable<any>{
    return this.http.get(this.url+ id);
  }

  editarPorducto(id: string , producto: Producto):Observable<any>{
    return this.http.put(this.url + id ,producto)
  }
  subirImagen(id: string, formData: FormData): Observable<any> {
  return this.http.post(this.url + 'subir-imagen/' + id, formData);
}

}
