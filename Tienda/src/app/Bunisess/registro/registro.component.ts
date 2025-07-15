import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { registroService } from '../../services/registro.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private registroservice: registroService) {
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
      alert('Por favor llena todos los campos correctamente');
      return;
    }

    const usuario = this.registroForm.value;

    this.registroservice.registrarUsuario(usuario).subscribe({
      next: (res: any) => {
        alert(res.mensaje);
        this.registroForm.reset();
      },
      error: (err) => {
        alert(err.error.mensaje || 'Error al registrar');
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
