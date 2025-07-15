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
      icono: 'https://cdn-icons-png.flaticon.com/512/3631/3631574.png',
      titulo: 'Cumpleaños',
      color: 'text-pink-600',
      descripcion: 'Sorprende en su día especial con un arreglo lleno de alegría y color.'
    },
    {
      icono: 'https://www.tierradefloresquito.com/wp-content/uploads/2014/12/REDONDO-VARIADO-ELEGANTE-3-600x600.png',
      titulo: 'Aniversario',
      color: 'text-red-600',
      descripcion: 'Celebra años de amor con flores elegantes y memorables.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/3190/3190613.png',
      titulo: 'Día de la Madre',
      color: 'text-rose-500',
      descripcion: 'Un detalle floral para la persona que te dio la vida.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/1533/1533712.png',
      titulo: 'Día del Padre',
      color: 'text-blue-600',
      descripcion: 'Flores que reflejan fuerza y cariño para papá.'
    },
    {
      icono: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png',
      titulo: 'San Valentín',
      color: 'text-fuchsia-700',
      descripcion: 'Expresa tu amor con un ramo que hable por ti.'
    },
    {
      icono: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4OgtzEU9Mp96asgB0vAp3hTNjRhMeS45ww&s',
      titulo: 'Graduación',
      color: 'text-emerald-600',
      descripcion: 'Celebra logros importantes con flores llenas de orgullo.'
    }
  ];
}
