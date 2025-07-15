import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-confirmacion-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacion-pago.component.html',
  styleUrls: ['./confirmacion-pago.component.css']
})
export class ConfirmacionPagoComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const pedido = localStorage.getItem('pedidoTemporal');
    if (pedido) {
      try {
        const productos = JSON.parse(pedido);

        // Validar que productos sea un array antes de filtrar
        if (Array.isArray(productos)) {
          this.productos = productos.filter(p => p && typeof p === 'object' && p.nombre && p.precio > 0);
          // Actualizar localStorage con productos limpios
          localStorage.setItem('pedidoTemporal', JSON.stringify(this.productos));
        } else {
          this.productos = [];
        }
      } catch (error) {
        console.error('Error parseando pedidoTemporal:', error);
        this.productos = [];
        localStorage.removeItem('pedidoTemporal'); // limpiamos para evitar errores futuros
      }
    } else {
      this.productos = [];
      }
    }
  }

  getTotal(): number {
    return this.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }

confirmarPago() {
  const correo = 'cliente@gmail.com'; // TODO: reemplazar con correo real del cliente (puede venir de login o un formulario)

  const datosPago = {
    productos: this.productos,
    correo: correo
  };

  this.carritoService.iniciarPago(datosPago).subscribe({
    next: (response) => {
      console.log('Respuesta de Stripe:', response);
      if (response.urlPago) {
        window.location.href = response.urlPago;
      } else {
        alert('No se pudo generar el link de pago');
      }
    },
    error: (err) => {
      console.error('Error al generar link de pago:', err);
      alert('Error en el servidor al generar el pago');
    }
  });
}
}