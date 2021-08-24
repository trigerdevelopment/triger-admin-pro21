import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureRoutingModule } from './manufacture-routing.module';
import { ProductionListComponent } from './production-list/production-list.component';
import { ProductionFormComponent } from './production-form/production-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductionFilterComponent } from './production-list/production-filter/production-filter.component';
import { ProductionPaginatorComponent } from './production-list/production-paginator/production-paginator.component';
import { StoreModule } from '@ngrx/store';
import * as fromProductionReducer from '../manufacture/store/reducers/productions.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductionEffects } from './store/effects/productions.effects';


@NgModule({
  declarations: [ProductionListComponent, ProductionFormComponent, ProductionFilterComponent, ProductionPaginatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ManufactureRoutingModule,
    StoreModule.forFeature(fromProductionReducer.ProductionFeatureKey, fromProductionReducer.reducer),
    EffectsModule.forFeature([ProductionEffects]),
  ]
})
export class ManufactureModule { }
