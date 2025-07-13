import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./Bunisess/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./inicio/inicio/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./share/components/layaout/layaout.component').then((m) => m.LayaoutComponent),
    children: [

      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./Bunisess/products/products.component').then((m) => m.ProductsComponent),
      }



    ],
  },

  {
    path: '**',
    redirectTo: 'inicio',
  },
]
