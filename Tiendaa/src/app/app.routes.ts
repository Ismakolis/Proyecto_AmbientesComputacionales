import { Routes } from '@angular/router';
import { AdminGuard } from './guard/adminGuard';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./Bunisess/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./Bunisess/registro/registro.component').then((m) => m.RegistroComponent),
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
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./Bunisess/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'carrito',
        loadComponent: () =>
          import('./Bunisess/carrito/carrito.component').then((m) => m.CarritoComponent),
      },
      {
        path: 'agregarProducto',
        loadComponent: () =>
          import('./Bunisess/agregar-producto/agregar-producto.component').then((m) => m.AgregarProductoComponent),
      },
      {
        path: 'agregarProducto/:id',
        loadComponent: () =>
          import('./Bunisess/agregar-producto/agregar-producto.component').then((m) => m.AgregarProductoComponent),
      },
      {
        path: 'misProductos',
        loadComponent: () =>
          import('./Bunisess/mis-productos/mis-productos.component').then((m) => m.MisProductosComponent),
        canActivate: [AdminGuard]
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./Bunisess/categoria/categoria.component').then((m) => m.CategoriaComponent)
      },
      {
        path: 'categorias/:id',
        loadComponent: () =>
          import('./Bunisess/productos-por-categoria/productos-por-categoria.component').then((m) => m.ProductosPorCategoriaComponent)

      },
      {
        path: 'confirmacion-pago',
        loadComponent: () => import('./Bunisess/confirmacion-pago/confirmacion-pago.component').then(m => m.ConfirmacionPagoComponent)
      },
      {
        path: 'clientes',
        loadComponent: () => import('./Bunisess/cliente-listar/cliente-listar').then(m => m.ClienteListar)
      },
      {
        path: 'clientes/:id',
        loadComponent: () =>
          import('./Bunisess/cliente-formulario/cliente-formulario').then((m) => m.ClienteFormulario)

      },
      {
        path: 'clientes/nuevo',
        loadComponent: () =>
          import('./Bunisess/cliente-formulario/cliente-formulario').then((m) => m.ClienteFormulario)

      },
      {
        path: 'gracias',
        loadComponent: () => import('./Bunisess/gracias/gracias.component').then(m => m.GraciasComponent)
      },
      {
        path: 'proveedores',
        loadComponent: () =>
          import('./Bunisess/prov/prov').then((m) => m.Prov)
      }



    ],
  },

  {
    path: '**',
    redirectTo: 'inicio',
  },
]
