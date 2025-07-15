import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/acceso-denegado']);
      return false;
    }

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
