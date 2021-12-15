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
import { TypesListComponent } from './types/types-list/types-list.component';
import { ProductCategoryListComponent } from './product-category/product-category-list/product-category-list.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { ExpenseTypeListComponent } from './expense-type/expense-type-list/expense-type-list.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';


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
    path: 'types',
    component: TypesListComponent,
    data: {titulo: 'Registro de Categorias',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },
  {canActivate:[AuthGuard],
    path: 'expenses-type',
    component: ExpenseTypeListComponent,
    data: {titulo: 'Registro de las Categorias de Gastos',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },
  {canActivate:[AuthGuard],
    path: 'product-category-list',
    component: ProductCategoryListComponent,
    data: {titulo: 'Registro de Categorias de Productos',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

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
  {
    path: 'upload-files',
    component: UploadFilesComponent,
    data: {titulo: 'Cargar Archivo de Datos',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }


  },
];

@NgModule({
  imports:[RouterModule.forChild(pagesRoutes)],
  exports:[RouterModule]
})

export class PagesRoutesModule{}
// export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
