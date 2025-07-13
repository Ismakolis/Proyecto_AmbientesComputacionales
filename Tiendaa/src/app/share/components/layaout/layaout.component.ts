import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layaout',
  standalone:true,
  imports: [HeaderComponent,SidebarComponent,FooterComponent,RouterOutlet],
  templateUrl: './layaout.component.html',
  styleUrl: './layaout.component.css'
})
export  class LayaoutComponent {

}
