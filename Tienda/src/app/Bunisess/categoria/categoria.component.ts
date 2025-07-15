import { Component, OnInit } from '@angular/core';
import { CategoriaService, Categoria } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-categoria',
  imports:[CommonModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];

  nombreError: string = '';
  descripcionError: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
      this.cdr.detectChanges(); 
    });
  }

  validarNombre(value: string): void {
    const soloLetrasRegex = /^[a-zA-Z\s]+$/;
  
    if (!value) {
      this.nombreError = 'El nombre es obligatorio.';
    } else if (!soloLetrasRegex.test(value)) {
      this.nombreError = 'El nombre solo puede contener letras y espacios.';
    } else if (value.length < 3) {
      this.nombreError = 'El nombre debe tener al menos 3 caracteres.';
    } else if (value.length > 20) {
      this.nombreError = 'El nombre debe tener máximo 20 caracteres.';
    } else {
      this.nombreError = '';
    }
  }

  validarDescripcion(value: string): void {
    // Ejemplo: limitar descripción a 100 caracteres
    if (value && value.length > 100) {
      this.descripcionError = 'La descripción debe tener máximo 100 caracteres.';
    } else {
      this.descripcionError = '';
    }
  }

  crearCategoria(nombre: string, descripcion: string): void {
    this.validarNombre(nombre);
    this.validarDescripcion(descripcion);

    if (this.nombreError || this.descripcionError) {
      return; // No enviar si hay errores
    }

    const nuevaCategoria: Categoria = { nombre, descripcion };

    this.categoriaService.crearCategoria(nuevaCategoria).subscribe(categoria => {
      this.categorias.push(categoria);
    });
  }
}
