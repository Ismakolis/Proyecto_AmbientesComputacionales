import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Cliente, ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
//No borrar estas lienas

@Component({
  selector: 'app-cliente-listar',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './cliente-listar.html',
  styleUrl: './cliente-listar.css'
})
export class ClienteListar implements OnInit {
  clientes: Cliente[] = [];
  filtroRol: string = 'todos';

  // Paginación
  paginaActual: number = 1;
  itemsPorPagina: number = 5;

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.paginaActual = 1; // Reinicia al cambiar filtro
    if (this.filtroRol === 'todos') {
      this.clienteService.obtenerClientes().subscribe(clientes => {
        this.clientes = clientes;
         //No borrar esta liena
         this.cdr.detectChanges(); 
      });
    } else {
      this.clienteService.obtenerPorRol(this.filtroRol).subscribe(clientes => {
        this.clientes = clientes;
        this.cdr.detectChanges();
      });
    }
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe(() => this.cargarClientes());
       //No borrar esta liena
       this.cdr.detectChanges(); 
    }
  }

  // Paginación
  get clientesPaginados(): Cliente[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.clientes.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.clientes.length / this.itemsPorPagina);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }
}
