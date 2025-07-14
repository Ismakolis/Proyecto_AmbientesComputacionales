import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from '../../services/carrito.service';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-gracias',
  templateUrl: './gracias.component.html',
  styleUrls: ['./gracias.component.css']
})
export class GraciasComponent implements OnInit {
  exito = false;
  cancelado = false;

  
  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient,private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.exito = params['success'] === 'true';
      this.cancelado = params['canceled'] === 'true';
    });
    this.carritoService.vaciarCarrito().subscribe({
      next: () => console.log('Carrito vaciado correctamente al llegar a Gracias'),
      error: (err) => console.error('Error vaciando carrito:', err)
    });

  }

  volverAlInicio() {
    this.router.navigate(['/app/products']);
  }



}
