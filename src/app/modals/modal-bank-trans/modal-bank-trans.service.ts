import { Injectable } from '@angular/core';
import { BankMovementsFormService } from 'src/app/bank/bank-movements-form.service';

@Injectable({
  providedIn: 'root'
})
export class ModalBankTransService {

  modal="ocultar";


  constructor(public bankFormService: BankMovementsFormService) { }

  mostrarModalBankTrans() {
    this.modal = "";
  }

  cerrarModal(){
    this.bankFormService.cleanForm();
    this.modal = "ocultar";
  }
}
