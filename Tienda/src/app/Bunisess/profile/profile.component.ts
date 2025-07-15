
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, Usuario } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent  implements OnInit{

  usuario: Usuario | null = null;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.authService.getUsuarioSesion().subscribe({
      next: usuario => {
        this.usuario = usuario;
        this.cdr.detectChanges();
      },
      error: err => console.error('No se pudo cargar el usuario', err)
    });
  }
}