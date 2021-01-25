import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComponent } from './bank.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { SharedModule } from '../shared/shared.module';
import { BANK_ROUTES } from './bank.routes';
import { BankCsvMovementsComponent } from './bank-csv-movements/bank-csv-movements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BankComponent, BankAccountsComponent, BankCsvMovementsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    BANK_ROUTES
  ]
})
export class BankModule { }
