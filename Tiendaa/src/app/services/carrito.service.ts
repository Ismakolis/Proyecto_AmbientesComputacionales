import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private url = 'http://localhost:4000/api/carrito/';
  carritoActualizado = new Subject<void>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Método privado para validar si el usuario está autenticado
  private validarAutenticacion<T>(accion: () => Observable<T>): Observable<T> {
    return new Observable<T>((observer) => {
      this.authService.getUsuarioSesion().subscribe({
        next: () => {
          // Si está autenticado, ejecuta la acción
          accion().subscribe({
            next: (res) => observer.next(res),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
          });
        },
        error: (err) => {
          observer.error({ mensaje: 'Usuario no autenticado', detalle: err });
        }
      });
    });
  }

  // Obtener ítems del carrito
  obtenerItems(): Observable<any> {
    return this.validarAutenticacion(() =>
      this.http.get(this.url)
    );
  }

  // Agregar ítem al carrito
  agregarItem(productoId: string, cantidad: number): Observable<any> {
    return this.validarAutenticacion(() =>
      this.http.post(this.url, { productoId, cantidad }).pipe(
        tap(() => this.carritoActualizado.next())
      )
    );
  }

  // Eliminar ítem del carrito
  eliminarItem(id: string): Observable<any> {
    return this.validarAutenticacion(() =>
      this.http.delete(this.url + id).pipe(
        tap(() => this.carritoActualizado.next())
      )
    );
  }

  // Actualizar cantidad de un ítem
  actualizarCantidad(id: string, cantidad: number): Observable<any> {
    return this.validarAutenticacion(() =>
      this.http.put(this.url + id, { cantidad }).pipe(
        tap(() => this.carritoActualizado.next())
      )
    );
  }

  // Vaciar carrito
  vaciarCarrito(): Observable<any> {
    return this.validarAutenticacion(() =>
      this.http.delete(this.url + 'vaciar').pipe(
        tap(() => this.carritoActualizado.next())
      )
    );
  }

  // Iniciar proceso de pago
  iniciarPago(datos: { productos: any[], correo: string }): Observable<{ urlPago: string }> {
    return this.validarAutenticacion(() =>
      this.http.post<{ urlPago: string }>('http://localhost:4000/api/pago', datos)
    );
  }
}
