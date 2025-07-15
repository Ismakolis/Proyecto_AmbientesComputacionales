import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  get correo() {
    return this.loginForm.get('correo')!;
  }

  get contrasena() {
    return this.loginForm.get('contrasena')!;
  }

  iniciarSesion() {
    if (this.loginForm.invalid) return;

    const { correo, contrasena } = this.loginForm.value;

    this.loginService.login(correo, contrasena).subscribe({
      next: (res) => {
        this.toastr.success('Inicio de sesión exitoso', 'Bienvenido');
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.router.navigate(['/app']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Correo o contraseña incorrectos', 'Error de autenticación');
      }
    });
  }
}
