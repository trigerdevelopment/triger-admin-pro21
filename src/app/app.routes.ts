import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { PagenofoundComponent } from './pagenofound/pagenofound.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CustomerComponent } from './customer/customer.component';

import { PagesComponent } from './pages/pages.component';
// import { PagesComponent } from './pages/pages.component';



const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },

  { canActivate:[AuthGuard],
    path: 'register', component: RegisterComponent,
    data: {titulo: 'Almacen',expectedRol: ['admin'] }
  },
  {
    path: 'dashboard',
    component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),

  },
  {
    path: 'bancoschal',
    component: ProveedoresComponent,
    loadChildren: () => import('./bank/bank.module').then(m => m.BankModule),

  },
  {
    path: 'proveedoreschal',
    component: ProveedoresComponent,
    loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule),

  },
  {
    path: 'clientes',
    component: ClientesComponent,
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),

  },
  {
    path: 'customer',
    component: CustomerComponent,
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),

  },
  {
    path: 'reporteschal',
    component: ClientesComponent,
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),

  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PagenofoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true });
