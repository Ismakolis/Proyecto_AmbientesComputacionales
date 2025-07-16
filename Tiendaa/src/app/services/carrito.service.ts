import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carritoActualizado = new Subject<void>();

  constructor(
    private api: ApiService,
    private authService: AuthService
  ) {}

  private validarAutenticacion<T>(accion: () => Observable<T>): Observable<T> {
    return new Observable<T>((observer) => {
      this.authService.getUsuarioSesion().subscribe({
        next: () => {
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

  obtenerItems(): Observable<any> {
    return this.validarAutenticacion(() => this.api.get('carrito'));
  }

  agregarItem(productoId: string, cantidad: number): Observable<any> {
    return this.validarAutenticacion(() =>
      this.api.post('carrito', { productoId, cantidad }).pipe(
        tap(() => this.carritoActualizado.next())
      )
    );
  }

  eliminarItem(id: string): Observable<any> {
    return this.validarAutenticacion(() =>
      this.api.delete(`carrito/${id}`).pipe(
        tap(() => this.carritoActualizado.next())
      )
    );
  }

  actualizarCantidad(id: string, cantidad: number): Observable<any> {
    return this.validarAutenticacion(() =>
      this.api.put(`carrito/${id}`, { cantidad }).pipe(
        tap(() => this.carritoActualizado.next())
      )
    );
  }

  vaciarCarrito(): Observable<any> {
    return this.validarAutenticacion(() =>
      this.api.delete('carrito/vaciar').pipe(
        tap(() => this.carritoActualizado.next())
      )
    );
  }

  iniciarPago(datos: { productos: any[], correo: string }): Observable<{ urlPago: string }> {
    return this.validarAutenticacion(() =>
      this.api.post<{ urlPago: string }>('pago', datos)
    );
  }
}
