import { NgModule } from '@angular/core';
import { BredcrumbsComponent } from './bredcrumbs/bredcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalIconComponent } from '../modals/modal-icon/modal-icon.component';
import { FormUserRegisterComponent } from '../modals/modal-user-register/form-user-register/form-user-register.component';
import { ModalUserRegisterComponent } from '../modals/modal-user-register/modal-user-register.component';
import { ModalUserCardComponent } from '../modals/modal-user-card/modal-user-card.component';
import { ModalTaskComponent } from '../modals/modal-task/modal-task.component';
import { FormTaskComponent } from '../modals/modal-task/form-task/form-task.component';
import { ModalUploadComponent } from '../modals/modal-upload/modal-upload.component';
import { InvoiceFormComponent } from '../forms/invoice-form/invoice-form.component';
import { EnumeratePipe } from '../customer/enumerate.pipe';
import { NgxModalService } from '../services/shared/ngx-modal.service';
import { ModalProductCategoryComponent } from '../modals/modal-product-category/modal-product-category.component';
import { ModalExpenseTypeFileUploadComponent } from '../modals/modal-expense-type-file-upload/modal-expense-type-file-upload.component';



@NgModule({
  declarations: [
    BredcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ModalIconComponent,
    ModalUserRegisterComponent,
    FormUserRegisterComponent,
    ModalUserCardComponent,
    ModalUploadComponent,
    ModalTaskComponent,
    ModalProductCategoryComponent,
    ModalExpenseTypeFileUploadComponent,
    FormTaskComponent,
    InvoiceFormComponent,
    EnumeratePipe,
  ],
  exports: [
    BredcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ModalIconComponent,
    ModalUserRegisterComponent,
    FormUserRegisterComponent,
    ModalUserCardComponent,
    ModalUploadComponent,
    ModalTaskComponent,
    ModalProductCategoryComponent,
    ModalExpenseTypeFileUploadComponent,
    FormTaskComponent,
    InvoiceFormComponent,
    EnumeratePipe,
  ],

  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],

  providers:[
    NgxModalService
  ]


})
export class SharedModule { }
