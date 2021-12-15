import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementWhareHouseRoutingModule } from './movement-whare-house-routing.module';
import { MovementWhareHouseListComponent } from './movement-whare-house-list/movement-whare-house-list.component';
import { MovementWhareHouseFilterComponent } from './movement-whare-house-filter/movement-whare-house-filter.component';
import { MovementWhareHouseDetailsComponent } from './movement-whare-house-details/movement-whare-house-details.component';
import { MovementWhareHouseDetailsFormComponent } from './movement-whare-house-details-form/movement-whare-house-details-form.component';
import { MovementWhareHouseComponent } from './movement-whare-house.component';
import { SharedModule } from '../shared/shared.module';
import { WhareHousePaginatorComponent } from './whare-house-paginator/whare-house-paginator.component';
import { StoreModule } from '@ngrx/store';

import * as fromWhareHouse from './store/reducers/whare-house.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { WhareHouseEffects } from './store/effects/whare-house.effects';
import { WhareHouseFormComponent } from './whare-house-form/whare-house-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { WhareHouseModalComponent } from './whare-house-modal/whare-house-modal.component';

@NgModule({
  declarations: [MovementWhareHouseComponent, MovementWhareHouseListComponent, MovementWhareHouseFilterComponent, MovementWhareHouseDetailsComponent, MovementWhareHouseDetailsFormComponent, WhareHousePaginatorComponent, WhareHouseFormComponent, WhareHouseModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forChild(),
    MovementWhareHouseRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromWhareHouse.wharehouseFeatureKey, fromWhareHouse.reducer),
    EffectsModule.forFeature([WhareHouseEffects]),


  ]
})
export class MovementWhareHouseModule { }
