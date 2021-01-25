import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { BancosComponent } from './bancos/bancos.component';
import { MovimientosComponent } from './bancos/movimientos/movimientos.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SupplierComponent } from '../supplier/supplier.component';


const pagesRoutes: Routes = [
  {canActivate:[AuthGuard],
    path: '',
    component: DashboardComponent,
    data: {titulo: 'Dashboard',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },
  {canActivate:[AuthGuard],
    path: 'tareas',
    component: TaskListComponent,
    data: {titulo: 'Registro de Tareas',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },
  {canActivate:[AuthGuard],
    path: 'usuarios',
    component: ListaUsuariosComponent,
    data: {titulo: 'Usuarios Registrados',expectedRol: ['ROLE_ADMIN'] }

  },
  {canActivate:[AuthGuard],
    path: 'bancos',
    component: BancosComponent,
    data: {titulo: 'Bancos',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },
  {canActivate:[AuthGuard],
    path: 'bancos/movimientos',
    component:MovimientosComponent ,
    data: {titulo: 'Movimientso Bancarios',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },

  {
    path: 'supplier',
    component: SupplierComponent,
    loadChildren: () => import('../supplier/supplier.module').then(m => m.SupplierModule),

  },
];

@NgModule({
  imports:[RouterModule.forChild(pagesRoutes)],
  exports:[RouterModule]
})

export class PagesRoutesModule{}
// export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
