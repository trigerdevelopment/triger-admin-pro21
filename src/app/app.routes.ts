import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { PagenofoundComponent } from './pagenofound/pagenofound.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './services/auth/auth.guard';
import { CustomerComponent } from './customer/customer.component';

import { PagesComponent } from './pages/pages.component';
import { ReportsComponent } from './reports/reports.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ManufactureComponent } from './manufacture/manufacture.component';



const appRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
//  { path: 'login',
//   component: LoginComponent,
//   loadChildren: ()=> import('./login/auth.module').then(m=>m.AuthModule)
// },
  { path: 'user', component: UserComponent },
  { canActivate:[AuthGuard],
    path: 'register', component: RegisterComponent,
    data: {titulo: 'Almacen',expectedRol: ['admin'] }
  },
  {
    path: 'supplier',
    component: SupplierComponent,
    loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),

  },
  {
    path: 'bank',
    component: SupplierComponent,
    loadChildren: () => import('./bank/bank.module').then(m => m.BankModule),

  },
  {
    path: 'dashboard',
    component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),

  },
   {
    path: 'customer',
    component: CustomerComponent,
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),

  },

   {
    path: 'product',
    component: CustomerComponent,
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),

  },
   {
    path: 'reports',
    component: ReportsComponent,
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),

  },
   {
    path: 'manufacture',
    component: ManufactureComponent,
    loadChildren: () => import('./manufacture/manufacture.module').then(m => m.ManufactureModule),

  },
   {
    path: 'inventory',
    component: ManufactureComponent,
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule),

  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PagenofoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true });
