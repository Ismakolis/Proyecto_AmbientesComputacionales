import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { registroService } from '../../services/registro.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroservice: registroService,
    private toastr: ToastrService,
    private router: Router 
  ) {
    this.registroForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['']
    });
  }

  registrarUsuario() {
    if (this.registroForm.invalid) {
      this.toastr.warning('Por favor llena todos los campos correctamente', 'Formulario inválido');
      return;
    }

    const usuario = this.registroForm.value;

    this.registroservice.registrarUsuario(usuario).subscribe({
      next: (res: any) => {
        this.toastr.success('¡Registro exitoso!', 'Bienvenido');
        this.registroForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 800);
      },
      error: (err) => {
        const msg = err.error?.mensaje || 'Ocurrió un error al registrarte';
        this.toastr.error(msg, 'Error');
      }
    });
  }

  get correo() {
    return this.registroForm.get('correo');
  }

  get contrasena() {
    return this.registroForm.get('contrasena');
  }

  get nombre() {
    return this.registroForm.get('nombre');
  }

  get apellido() {
    return this.registroForm.get('apellido');
  }

  get telefono() {
    return this.registroForm.get('telefono');
  }
}
