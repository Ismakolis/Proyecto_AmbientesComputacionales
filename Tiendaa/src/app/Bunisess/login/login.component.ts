import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  cargando = false;
  mensajeCarga = '';

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
  
    this.cargando = true;
    this.mensajeCarga = 'Validando tus credenciales...';
  
    const { correo, contrasena } = this.loginForm.value;
  
    this.loginService.login(correo, contrasena).subscribe({
      next: (res) => {
        this.toastr.success('Inicio de sesión exitoso', 'Bienvenido');
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
  
        this.mensajeCarga = 'Cargando tu cuenta...';
  
        setTimeout(() => {
          this.cargando = false;
          this.router.navigate(['/app']);
        }, 1500);
      },
      error: (err) => {
        this.cargando = false;
        console.error(err);
        this.toastr.error('Correo o contraseña incorrectos', 'Error de autenticación');
      }
    });
  }
}  
