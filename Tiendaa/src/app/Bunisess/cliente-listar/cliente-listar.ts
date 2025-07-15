import { Component,OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cliente-listar',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './cliente-listar.html',
  styleUrl: './cliente-listar.css'
})
export class ClienteListar implements OnInit {
  clientes: Cliente[] = [];
  filtroRol: string = 'todos';

  constructor(private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    if (this.filtroRol === 'todos') {
      this.clienteService.obtenerClientes().subscribe(clientes => {
        this.clientes = clientes;
        this.cdr.detectChanges(); // 👈 Esto es lo que faltaba
      });
    } else {
      this.clienteService.obtenerPorRol(this.filtroRol).subscribe(clientes => {
        this.clientes = clientes;
        this.cdr.detectChanges(); // 👈 Esto también
      });
    }
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe(() => this.cargarClientes());
      this.cdr.detectChanges();
    }
  }
}
