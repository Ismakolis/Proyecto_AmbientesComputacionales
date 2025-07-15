import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../services/sidebar';
import { LogoutService } from '../../../services/logout.service';

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

  constructor(private sidebarService: SidebarService, private router: Router, private logoutService: LogoutService,) { }
  ngOnInit() {
    if (typeof window !== 'undefined') {
      const usuario = localStorage.getItem('usuario');
      this.isLoggedIn = !!usuario;
    }
  }


  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  cerrarSesion() {
    this.logoutService.logout().subscribe({
      next: (res) => {
        console.log(res.mensaje);
        localStorage.removeItem('usuario');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión', err);
      }
    });
  }

}