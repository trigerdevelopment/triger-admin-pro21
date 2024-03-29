import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComponent } from './bank.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BankTransactionsComponent } from './bank-transactions/bank-transactions.component';
import { BankFilterComponent } from './bank-filter/bank-filter.component';
import { BankPaginatorComponent } from './bank-paginator/bank-paginator.component';
import * as fromBankMov from '../bank/store/reducers/bank.transactions.reducers';
import { BankMovEffects } from './store/effects/bank.transactions.effects';
import { BankRoutingModule } from './bank-routing.module';
import { ChartsModule } from 'ng2-charts';
import { BankMovCsvModalComponent } from '../modals/bank-mov-csv-modal/bank-mov-csv-modal.component';
import { NgxProductModalService } from '../services/shared/ngx-product-modal.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalBankTransComponent } from '../modals/modal-bank-trans/modal-bank-trans.component';
import { FormBankTransComponent } from '../modals/modal-bank-trans/form-bank-trans/form-bank-trans.component';


@NgModule({
  declarations: [
    BankComponent,
    BankAccountsComponent,
    BankTransactionsComponent,
    BankFilterComponent,
    BankPaginatorComponent,
    BankMovCsvModalComponent,
    ModalBankTransComponent,
  FormBankTransComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    BankRoutingModule,
    ChartsModule,
    StoreModule.forFeature(fromBankMov.bankMovFeatureKey, fromBankMov.bankmovreducer),
    EffectsModule.forFeature([BankMovEffects]),
    ModalModule.forChild(),

  ],
  providers:[   NgxProductModalService,]
})
export class BankModule { }
