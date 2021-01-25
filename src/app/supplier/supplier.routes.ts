import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../services/auth/auth.guard';
import { SupplierInvoiceListComponent } from './supplier-invoice-list/supplier-invoice-list.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierComponent } from './supplier.component';


const supplierRoutes: Routes = [
  // {
  //   canActivate:[AuthGuard],
  //   path: '',
  //   component: SupplierComponent,
  //   data: {titulo: 'Supplier Component',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  // },
  {canActivate:[AuthGuard],
    path: 'invoice-list',
    component: SupplierInvoiceListComponent,
    data: {titulo: 'Supplier Component',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },


]

export const SUPPLIER_ROUTES = RouterModule.forChild( supplierRoutes );
