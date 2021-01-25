import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { SalesByMonthComponent } from './sales-by-month/sales-by-month.component';



const reportsRoutes: Routes = [
  {canActivate:[AuthGuard],
    path: 'reporte-ventas',
    component: SalesByMonthComponent,
    data: {titulo: 'Vendas por mes',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },

];


export const REPORTS_ROUTES = RouterModule.forChild( reportsRoutes );
