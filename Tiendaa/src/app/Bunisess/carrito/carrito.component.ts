import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
//No borrar esta liena
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, OnDestroy {
  items: any[] = [];
  cargando = false;

  private carritoSub!: Subscription;

  constructor(private carritoService: CarritoService,
    private router: Router,
    //No borrar esta liena
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarCarrito();

    // Suscribirse para recargar carrito automáticamente cuando haya cambios
    this.carritoSub = this.carritoService.carritoActualizado.subscribe(() => {
      this.cargarCarrito();

    });
  }

  ngOnDestroy(): void {
    this.carritoSub.unsubscribe();
  }

  cargarCarrito() {
    this.cargando = true;
    this.carritoService.obtenerItems().subscribe({
      next: (data) => {
        this.items = data || [];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.items = [];
        this.cargando = false;
      }
    });
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => {
      const precio = item.producto?.precio || 0;
      const cantidad = item.cantidad || 0;
      return acc + precio * cantidad;
    }, 0);
  }

  removeItem(item: any) {
    if (this.cargando) return;
    this.cargando = true;
    this.carritoService.eliminarItem(item._id).subscribe({
      next: () => this.cargando = false,
      error: () => this.cargando = false
    });
  }

  increaseQuantity(item: any) {
    if (this.cargando) return;
    const nuevaCantidad = (item.cantidad || 0) + 1;
    this.cargando = true;
    this.carritoService.actualizarCantidad(item._id, nuevaCantidad).subscribe({
      next: () => this.cargando = false,
      error: () => this.cargando = false
    });
  }

  decreaseQuantity(item: any) {
    if (this.cargando) return;
    if ((item.cantidad || 0) <= 1) return;
    const nuevaCantidad = item.cantidad - 1;
    this.cargando = true;
    this.carritoService.actualizarCantidad(item._id, nuevaCantidad).subscribe({
      next: () => this.cargando = false,
      error: () => this.cargando = false
    });
  }

  checkout() {
    console.log('checkout disparado');

    const productos = this.items.map(item => ({
      nombre: item.producto?.nombre || 'Nombre no disponible',
      precio: item.producto?.precio || 0,
      cantidad: item.cantidad || 0
    }));



    // Guardar productos en localStorage
    localStorage.setItem('pedidoTemporal', JSON.stringify(productos));

    // Redirigir a la página de confirmación
    this.router.navigate(['app/confirmacion-pago']);
  }
}
