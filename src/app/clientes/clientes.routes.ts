import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { FacturasComponent } from './facturas/facturas.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ResultadosDeLaBusquedaComponent } from './resultados-de-la-busqueda/resultados-de-la-busqueda.component';
import { SalesByCustomerComponent } from './sales-by-customer/sales-by-customer.component';
import { VentasPorClienteComponent } from './ventas-por-cliente/ventas-por-cliente.component';


const clientesRoutes: Routes = [
  {canActivate:[AuthGuard],
    path: 'lista-facturas',
    component: FacturasComponent,
    data: {titulo: 'Dashboard',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },
  {canActivate:[AuthGuard],
    path: 'ventas-por-cliente',
    component: VentasPorClienteComponent,
    data: {titulo: 'Dashboard',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },
  {canActivate:[AuthGuard],
    path: 'ventas',
    component: SalesByCustomerComponent,
    data: {titulo: 'Dashboard',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },
  // {canActivate:[AuthGuard],
  //   path: 'lista-facturas',
  //   component: FacturasComponent,
  //   data: {titulo: 'Dashboard',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  // },
  {canActivate:[AuthGuard],
    path: 'resultados-de-busqueda',
    component: ResultadosDeLaBusquedaComponent,
    data: {titulo: 'Dashboard',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  }
];


export const CLIENTES_ROUTES = RouterModule.forChild( clientesRoutes );
