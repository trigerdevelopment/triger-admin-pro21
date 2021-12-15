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
import { TypesComponent } from './types/types.component';
import { TypesListComponent } from './types/types-list/types-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductCategoryListComponent } from './product-category/product-category-list/product-category-list.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { ExpenseTypeListComponent } from './expense-type/expense-type-list/expense-type-list.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';



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
    TypesComponent,
    TypesListComponent,
    ProductCategoryComponent,
    ProductCategoryListComponent,
    ExpenseTypeComponent,
    ExpenseTypeListComponent,
    UploadFilesComponent,
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
