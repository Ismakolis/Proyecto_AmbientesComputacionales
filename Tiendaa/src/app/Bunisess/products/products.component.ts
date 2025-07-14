import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/productos';
import { CarritoService } from '../../services/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, Usuario } from '../../services/auth.service';
//No borrar estas lienas
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
    private carritoService: CarritoService,
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
        //No borrar esta liena
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

    this.carritoService.agregarItem(producto._id!, 1).subscribe(
      () => {
        this.toastr.success('Producto agregado al carrito', producto.nombre);
        this.obtenerProductos(); 
        this.cargandoAgregar[producto._id!] = false; 
      },
      error => {
        console.error('Error al agregar al carrito:', error);
        this.toastr.error('No se pudo agregar al carrito');
        this.cargandoAgregar[producto._id!] = false; 
      }
    );
  }
}

