import { Component } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { CarritoService } from '../../services/carrito.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos-por-categoria',
  imports: [CommonModule],
  templateUrl: './productos-por-categoria.component.html',
  styleUrl: './productos-por-categoria.component.css'
})
export class ProductosPorCategoriaComponent {
  productos: Producto[] = [];
  cargandoAgregar: { [productoId: string]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    //private carritoService: CarritoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID recibido en ruta:', id);

      if (id) {
        this.productoService.obtenerPorCategoria(id).subscribe(data => {
          console.log('Productos recibidos:', data);
          this.productos = data;
        });
      }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    const productoId = producto._id;
    this.cargandoAgregar[productoId] = true;

    //this.carritoService.agregarItem(productoId, 1).subscribe({
      //next: () => {
        //this.toastr.success('Producto agregado al carrito', 'Éxito');
        //this.cargandoAgregar[productoId] = false;
      //},
      //error: (err) => {
        //console.error('Error al agregar al carrito:', err);
        //this.toastr.error('No se pudo agregar al carrito', 'Error');
        //this.cargandoAgregar[productoId] = false;
      //}
    //});
  }
}
