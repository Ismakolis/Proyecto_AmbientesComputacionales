import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../services/sidebar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriaService, Categoria } from '../../../services/categoria.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  rol: string = 'cliente';
  categorias: Categoria[] = [];


  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.rol = usuario?.rol || 'cliente';

    this.categoriaService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al obtener categorías', err);
      }
    });


  }

  isVisible = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {
    this.sidebarService.sidebarVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });
  }

  mostrarCategorias: boolean = false;

  toggleCategorias(): void {
    this.mostrarCategorias = !this.mostrarCategorias;
  }

  cerrarSesion() {
    ;
  }

}
