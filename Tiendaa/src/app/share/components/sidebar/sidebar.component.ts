import { Component ,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../services/sidebar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  rol: string = 'cliente';

  

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.rol = usuario?.rol || 'cliente';



  }

  isVisible = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
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
