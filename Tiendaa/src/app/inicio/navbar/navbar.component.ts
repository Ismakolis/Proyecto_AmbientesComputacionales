import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cargando = false;
  mensajeCarga = '';

  constructor(private router: Router) {}

  navegarConCarga(ruta: string, mensaje: string = 'Cargando...') {
    this.cargando = true;
    this.mensajeCarga = mensaje;

    setTimeout(() => {
      this.cargando = false;
      this.router.navigate([ruta]);
    }, 1500);
  }
}
