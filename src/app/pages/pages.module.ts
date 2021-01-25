import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutesModule } from './pages.routes';
import { BancosComponent } from './bancos/bancos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MovimientosComponent } from './bancos/movimientos/movimientos.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { FormTaskService } from '../services/form-services/form-task.service';
import { FormUserService } from '../services/form-services/form-user.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    BancosComponent,
    UsuariosComponent,
    ListaUsuariosComponent,
    MovimientosComponent,
    TaskComponent,
    TaskListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutesModule,
    ModalModule.forRoot()


  ],
  exports: [

    ],
  providers: [
    FormTaskService,
    FormUserService
  ]
})
export class PagesModule { }
