import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../services/bank.service';

@Injectable({
  providedIn: 'root'
})
export class BankMovementsFormService {

  bankMovementCsv: any = {
    id: "",
    cuenta: "",
    fechag: "",
    fechaOpg: "",
    referencia: "",
    descripcion: "",
    codTransac: "",
    sucursal: "",
    depositos: "",
    retiros: "",
    saldo: "",
    movimiento: "",
    descripcionDetallada: "",
    typeOfCost: "",
  };



    constructor(
      public formBuilder: FormBuilder,
      public bankService: BankService,
    ) { }

  formBankMov: FormGroup = this.formBuilder.group({
    id: [""],
    cuenta: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    fechag: ["", Validators.required],
    fechaOpg: [""],
    referencia: [
      "",
      [Validators.required, Validators.minLength(12), Validators.maxLength(12)],
    ],
    descripcion: [""],
    codeTransac: [""],
    sucursal: [""],
    depositos: [""],
    retiros: [""],
    saldo: [""],
    movimiento: [""],
    descripcionDetallada: [""],
    typeOfCost: [""],
  });

  filledForm(value) {
    this. bankMovementCsv = value;
    var d = new Date(this.bankMovementCsv.fechag);
    var e = new Date(this.bankMovementCsv.fechaOpg);
    console.log('FECHA G ', d.toLocaleString().split(',')[0]);

      this.formBankMov.get("id").setValue(this.bankMovementCsv.id);
      this.formBankMov.get("cuenta").setValue(this.bankMovementCsv.cuenta);
      // this.formBankMov.get("fechag").setValue('01/01/2021');
      this.formBankMov.get("fechag").setValue(d.toLocaleString().split(',')[0]);
      this.formBankMov.get("fechaOpg").setValue(e.toLocaleString().split(',')[0]);
      this.formBankMov.get("referencia").setValue(this.bankMovementCsv.referencia);
      this.formBankMov.get("descripcion").setValue(this.bankMovementCsv.descripcion);
      this.formBankMov.get("codeTransac").setValue(this.bankMovementCsv.codeTransac);
      this.formBankMov.get("sucursal").setValue(this.bankMovementCsv.sucursal);
      this.formBankMov.get("depositos").setValue(this.bankMovementCsv.depositos);
      this.formBankMov.get("retiros").setValue(this.bankMovementCsv.retiros);
      this.formBankMov.get("saldo").setValue(this.bankMovementCsv.saldo);
      this.formBankMov.get("movimiento").setValue(this.bankMovementCsv.movimiento);
      this.formBankMov.get("descripcionDetallada").setValue(this.bankMovementCsv.descripcionDetallada);
      this.formBankMov.get("typeOfCost").setValue(this.bankMovementCsv.typeOfCost);
    }

    cleanForm() {
      this.formBankMov.reset();
   }

   submit() {}

   edit() {}

}
