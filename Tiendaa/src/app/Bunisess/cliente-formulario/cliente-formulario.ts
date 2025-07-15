import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registroService } from '../../services/registro.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
//No borrar estas lienas
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cliente-formulario',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-formulario.html',
  styleUrl: './cliente-formulario.css'
})
export class ClienteFormulario implements OnInit {
  clienteForm: FormGroup;
  cargando = false;
  errorMsg = '';
  esEdicion = false;
  clienteId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registroService: registroService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    
    private cdr: ChangeDetectorRef
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.minLength(6)]],
      rol: ['', Validators.required],
      telefono: ['']
    });
  }

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.paramMap.get('id');
    if (this.clienteId && this.clienteId !== 'nuevo') {
      this.esEdicion = true;
      this.cargarCliente(this.clienteId);
      this.clienteForm.get('contrasena')?.clearValidators();
      this.clienteForm.get('contrasena')?.updateValueAndValidity();
    }
  }

  cargarCliente(id: string) {
    this.registroService.obtenerClientePorId(id).subscribe({
      next: (cliente) => {
        this.clienteForm.patchValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          telefono: cliente.telefono,
          rol: cliente.rol
        });
      },
      error: (err) => {
        this.errorMsg = 'Error al cargar cliente';
        this.toastr.error(this.errorMsg, 'Error');
        //No borrar esta liena
        this.cdr.detectChanges(); 
      }
    });
  }

  onSubmit() {
    this.errorMsg = '';
    if (this.clienteForm.invalid) return;

    this.cargando = true;

    const data = { ...this.clienteForm.value };

    if (this.esEdicion && this.clienteId) {
      if (!data.contrasena) delete data.contrasena;

      this.registroService.actualizarCliente(this.clienteId, data).subscribe({
        next: () => {
          this.cargando = false;
          this.toastr.success('Cliente actualizado correctamente', 'Éxito');
          this.router.navigate(['app/clientes']);
        },
        error: (err) => {
          this.cargando = false;
          const msg = err.error?.mensaje || 'Error al actualizar cliente';
          this.errorMsg = msg;
          this.toastr.error(msg, 'Error');
        }
      });
    } else {
      this.registroService.registrarUsuario(data).subscribe({
        next: () => {
          this.cargando = false;
          this.toastr.success('Cliente registrado correctamente', 'Éxito');
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          this.cargando = false;
          const msg = err.error?.mensaje || 'Error al registrar cliente';
          this.errorMsg = msg;
          this.toastr.error(msg, 'Error');
        }
      });
    }
  }
}
