import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../services/sidebar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  randomSeed: number = Math.random();

  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit() {
    // Detectar si hay un usuario guardado en localStorage
    const usuario = localStorage.getItem('usuario');
    this.isLoggedIn = !!usuario;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  cerrarSesion() {
   
}

}