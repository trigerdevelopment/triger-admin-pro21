import { RouterModule, Routes } from "@angular/router";
// import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './services/auth/auth.guard';


const modulesRoutes: Routes = [
  {
    path: 'dashboard',
    // component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),

  },
]

export const MODULES_ROUTES = RouterModule.forRoot( modulesRoutes, { useHash: true });
