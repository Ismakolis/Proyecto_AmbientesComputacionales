import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/productos';
import { MisProductosService } from '../../services/misProductos';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService,Categoria } from '../../services/categoria.service';
//No borrar estas lienas
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-mis-productos',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-productos.component.html',
  styleUrl: './mis-productos.component.css'
})
export class MisProductosComponent {
  listProductos: Producto[] = [];
  categorias: Categoria[] = [];



  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor(
    private _productoService: MisProductosService,
    private toastr: ToastrService,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.obtenerCategorias();

  this.obtenerProductos();
   
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(
      data => {
        this.listProductos = data;
        //No borrar esta liena
        this.cdr.detectChanges(); 
      
  
        this.setPagination();
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProductos(id).subscribe(
      data => {
        this.toastr.error('El producto fue eliminado con éxito', 'Producto eliminado');
        this.obtenerProductos();
      },
      error => {
        console.log(error);
      }
    );
  }

  setPagination() {
    this.totalPages = Math.ceil(this.listProductos.length / this.itemsPerPage);
    // Si la página actual queda fuera del rango tras eliminar productos, ajustar
    if(this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get productosPaginados() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.listProductos.slice(start, start + this.itemsPerPage);
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }
  
  getCategoriaNombre(categoriaId: string): string {
    const categoria = this.categorias.find(cat => cat._id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
    
  }
  
  
  


}
