import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { ComprasComponent } from './compras/compras.component';


const proveedoresRoutes: Routes = [
  {canActivate:[AuthGuard],
    path: 'compras',
    component: ComprasComponent,
    data: {titulo: 'Dashboard',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  }
];


export const PROVEEDORES_ROUTES = RouterModule.forChild( proveedoresRoutes );
