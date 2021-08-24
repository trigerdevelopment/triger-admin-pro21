import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { FilterComponent } from './filter/filter.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './store/reducers/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import { EnumeratePipe } from '../customer/enumerate.pipe';
import { SharedModule } from '../shared/shared.module';
import { NgxModalService } from '../services/shared/ngx-modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleFileComponent } from '../modals/multiple-file/multiple-file.component';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxProductModalService } from '../services/shared/ngx-product-modal.service';
import { FormProductComponent } from '../modals/product-modal/form-product/form-product.component';



@NgModule({
  declarations: [ProductListComponent, FilterComponent, PaginatorComponent,ProductModalComponent,FormProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ModalModule.forChild(),

    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  exports:[
    ProductListComponent
  ],
  providers: [
    NgxProductModalService

  ]
})
export class ProductModule { }
