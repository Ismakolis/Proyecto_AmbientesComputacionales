import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const rol = usuario?.rol || 'cliente';

    if (rol === 'admin') {
      return true;
    } else {
      this.router.navigate(['/acceso-denegado']);
      return false;
    }
  }
}
