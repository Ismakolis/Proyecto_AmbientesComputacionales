import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/productos';
import { ToastrService } from 'ngx-toastr';
import { AuthService, Usuario } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  listProductos: Producto[] = [];
  cargandoAgregar: { [productoId: string]: boolean } = {};

  constructor(
    private _productoService: ProductoService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
    
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(
      data => {
        this.listProductos = data;
        this.cdr.detectChanges(); 
      },
      error => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  agregarAlCarrito(producto: Producto) {
    if (producto.stock <= 0) {
      this.toastr.warning('No hay stock disponible', 'Atención');
      return;
    }

    if (this.cargandoAgregar[producto._id!]) {
   
      return;
    }

    this.cargandoAgregar[producto._id!] = true;  
  }
}

