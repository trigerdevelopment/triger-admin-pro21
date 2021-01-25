import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { BankCsvMovementsComponent } from './bank-csv-movements/bank-csv-movements.component';
import { BankComponent } from './bank.component';


const bankRoutes: Routes = [
  // {canActivate:[AuthGuard],
  //   path: '',
  //   component: BankComponent,
  //   data: {titulo: 'Bancos',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  // },
  {canActivate:[AuthGuard],
    path: 'lista-cuentas',
    component: BankAccountsComponent,
    data: {titulo: 'Bancos',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },
  {canActivate:[AuthGuard],
    path: 'movimientos-bancarios',
    component: BankCsvMovementsComponent,
    data: {titulo: 'Bancos',expectedRol: ['ROLE_ADMIN','ROLE_VENTAS','ROLE_ALMACEN','ROLE_PRODUCCION','ROLE_COMPARAS','ROLE_CONTA'] }

  },

];


export const BANK_ROUTES = RouterModule.forChild( bankRoutes );
