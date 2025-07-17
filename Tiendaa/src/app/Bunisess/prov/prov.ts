import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
//No borrar estas lienas
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-prov',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prov.html',
  styleUrls: ['./prov.css']
})
export class Prov implements OnInit {
  proveedores: any[] = [];
  proveedorForm: FormGroup;
  editando: boolean = false;
  proveedorEditandoId: string = '';
  // Variables para paginación
paginaActual: number = 1;
itemsPorPagina: number = 3;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.proveedorForm = this.fb.group({
      nombre: [''],
      telefono: [''],
      email: [''],
      direccion: ['']
    });
  }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores(): void {
    this.http.get<any[]>('http://localhost:4000/api/proveedores')
      .subscribe(data => {
        this.proveedores = data;
        //No borrar esta liena
        this.cdr.detectChanges(); 
      });
  }

  guardarProveedor(): void {
    const data = this.proveedorForm.value;

    if (this.editando) {
      this.http.put(`http://localhost:4000/api/proveedores/${this.proveedorEditandoId}`, data)
        .subscribe(() => {
          this.obtenerProveedores();
          this.cancelarEdicion();
        });
    } else {
      this.http.post('http://localhost:4000/api/proveedores', data)
        .subscribe(() => {
          this.obtenerProveedores();
          this.proveedorForm.reset();
        });
    }
  }

  editarProveedor(prov: any): void {
    this.editando = true;
    this.proveedorEditandoId = prov._id;
    this.proveedorForm.patchValue(prov);
  }

  eliminarProveedor(id: string): void {
    this.http.delete(`http://localhost:4000/api/proveedores/${id}`)
      .subscribe(() => this.obtenerProveedores());
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.proveedorEditandoId = '';
    this.proveedorForm.reset();
  }

  
// Método para obtener los datos de la página actual
get proveedoresPaginados(): any[] {
  const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
  const fin = inicio + this.itemsPorPagina;
  return this.proveedores.slice(inicio, fin);
}

// Total de páginas calculado dinámicamente
get totalPaginas(): number {
  return Math.ceil(this.proveedores.length / this.itemsPorPagina);
}

// Cambiar de página
cambiarPagina(pagina: number): void {
  if (pagina >= 1 && pagina <= this.totalPaginas) {
    this.paginaActual = pagina;
  }
}
}
