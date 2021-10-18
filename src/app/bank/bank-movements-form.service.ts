import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BankService } from '../services/bank.service';

@Injectable({
  providedIn: 'root'
})
export class BankMovementsFormService {

  isEdit: boolean = false;


  bankMovementCsv: any = {
    id: "",
    accountNumber: "",
    date: "",
    dateTransactions: "",
    reference: "",
    description: "",
    codeTransaction: "",
    sucursal: "",
    deposit: "0.00",
    bankWithdrawals: "0.00",
    balance: "",
    movement: "",
    details: "",
    typeOfExpense: "",
    supplierName: "",
    customerName: "",
  };

  bankMovement: any = {
    id: "",
    accountNumber: "",
    date: "",
    dateTransactions: "",
    reference: "",
    description: "",
    codeTransaction: "",
    sucursal: "",
    deposit: "0.00",
    bankWithdrawals: "0.00",
    enabled: "false",
    balance: "",
    movement: "",
    details: "",
    typeOfExpense: "",
    supplierName: "",
    customerName: "",
  };



    constructor(
      public formBuilder: FormBuilder,
      public bankService: BankService,
      public alertService: ToastrService,

    ) { }

  formBankMov: FormGroup = this.formBuilder.group({
    id: [""],
    accountNumber: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(50)],
    ],
    date: ["", Validators.required],
    dateTransactions: ["",Validators.required],
    reference: [
      "",
      [Validators.required, Validators.minLength(1), Validators.maxLength(12)],
    ],
    description: [""],
    codeTransaction: [""],
    sucursal: [""],
    deposit: ["0.00"],
    bankWithdrawals: ["0.00"],
    balance: [""],
    movement: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(12)]],
    details: ["",[Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    typeOfExpense: ["",],
    supplierName: [""],
    customerName: [""],
    enabled: ["",]
  });

  filledForm(value) {
    this.bankMovementCsv = value;
    console.log('BALUE ', value);
    this.isEdit = !this.isEdit;

    var d = new Date(value.date);
    var e = new Date(value.dateTransactions);
    var w = new Date(d.getFullYear(),d.getMonth(), d.getDate()).toISOString().substring(0,10);
    var x = new Date(e.getFullYear(),e.getMonth(), e.getDate()).toISOString().substring(0,10);

    this.formBankMov.get("id").setValue(this.bankMovementCsv.id);
      this.formBankMov.get("accountNumber").setValue(this.bankMovementCsv.accountNumber);
      this.formBankMov.get("date").setValue(w);
      this.formBankMov.get("dateTransactions").setValue(x);
      this.formBankMov.get("reference").setValue(this.bankMovementCsv.reference);
      this.formBankMov.get("description").setValue(this.bankMovementCsv.description);
      this.formBankMov.get("codeTransaction").setValue(this.bankMovementCsv.codeTransaction);
      this.formBankMov.get("sucursal").setValue(this.bankMovementCsv.sucursal);
      this.formBankMov.get("deposit").setValue(this.bankMovementCsv.deposit);
      this.formBankMov.get("bankWithdrawals").setValue(this.bankMovementCsv.bankWithdrawals);
      this.formBankMov.get("balance").setValue(this.bankMovementCsv.balance);
      this.formBankMov.get("movement").setValue(this.bankMovementCsv.movement);
      this.formBankMov.get("details").setValue(this.bankMovementCsv.details);
      this.formBankMov.get("typeOfExpense").setValue(this.bankMovementCsv.typeOfExpense);
      this.formBankMov.get("supplierName").setValue(this.bankMovementCsv.supplierName);
      this.formBankMov.get("customerName").setValue(this.bankMovementCsv.customerName);
    }

    cleanForm() {
      this.formBankMov.setValue(this.bankMovement);
      this.isEdit =false;
   }

   submit() {
    let custom = JSON.stringify(this.formBankMov.value);
    console.log('FORM VALUE ', custom);

    this.bankService.updateBankMovement(custom).subscribe((res) => {
      this.alertService.info("El dato se agrego con exito a la base de datos");
    });
    this.cleanForm();
  }

  edit() {
    let custom = JSON.stringify(this.formBankMov.value);
    this.bankService
      .updateBankingTransaction(custom)
      .subscribe(res => {
        this.alertService.info("El Cliente se actualizo con exito");
      });
    this.cleanForm();
  }


}
