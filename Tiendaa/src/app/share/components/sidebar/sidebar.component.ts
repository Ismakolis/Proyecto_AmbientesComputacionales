import { Component, OnInit, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/sidebar';
import { LogoutService } from '../../../services/logout.service';
import { Router } from '@angular/router';
import { CategoriaService, Categoria } from '../../../services/categoria.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  rol: string = 'cliente';
  categorias: Categoria[] = [];
  isVisible = false;
  mostrarCategorias: boolean = false;
  saliendo: boolean = false;
  

  constructor(
    private sidebarService: SidebarService,
    private logoutService: LogoutService,
    private router: Router,
    private categoriaService: CategoriaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.sidebarService.sidebarVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });
  }

  ngOnInit() {
    // Solo ejecutar si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      this.rol = usuario?.rol || 'cliente';
    }

    this.categoriaService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al obtener categorías', err);
      }
    });
  }

  toggleCategorias(): void {
    this.mostrarCategorias = !this.mostrarCategorias;
  }

  cerrarSesion() {
    this.saliendo = true;
  
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario');
    }
  
    this.logoutService.logout().subscribe({
      next: (res) => {
        console.log(res.mensaje);
        setTimeout(() => {
          this.saliendo = false;
          this.router.navigate(['']);
        }, 1500); // retardo para mostrar el mensaje
      },
      error: (err) => {
        console.error('Error al cerrar sesión', err);
        this.saliendo = false;
      }
    });
  }
  
}
