import { Component } from '@angular/core';
import { CarrouselComponent } from '../../Bunisess/component/carrousel/carrousel.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CarrouselComponent, NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  categorias = [
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/992/992700.png', // Laptop icon
      titulo: 'Laptops',
      color: 'text-indigo-600',
      descripcion: 'Encuentra laptops potentes y portátiles para trabajo, estudio y gaming.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/1159/1159633.png', // Desktop icon
      titulo: 'Computadoras de Escritorio',
      color: 'text-blue-600',
      descripcion: 'Equipos de escritorio con alto rendimiento para todas tus necesidades.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/1090/1090632.png', // Gaming icon
      titulo: 'Gaming',
      color: 'text-red-600',
      descripcion: 'Hardware y accesorios para una experiencia de juego inmersiva.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/1827/1827933.png', // Monitor icon
      titulo: 'Monitores',
      color: 'text-green-600',
      descripcion: 'Pantallas de alta resolución y velocidad para productividad y gaming.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/565/565547.png', // Keyboard icon
      titulo: 'Periféricos',
      color: 'text-yellow-600',
      descripcion: 'Teclados, ratones, audífonos y más para complementar tu setup.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/3221/3221812.png', // Software icon
      titulo: 'Software',
      color: 'text-purple-600',
      descripcion: 'Programas y herramientas para optimizar tu productividad y creatividad.'
    }
  ];
  
}
