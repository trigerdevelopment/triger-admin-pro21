import { Component, OnInit } from '@angular/core';
import { BankMovementsFormService } from 'src/app/bank/bank-movements-form.service';
import { ModalBankTransService } from './modal-bank-trans.service';

@Component({
  selector: 'app-modal-bank-trans',
  templateUrl: './modal-bank-trans.component.html',
  styleUrls: ['./modal-bank-trans.component.css']
})
export class ModalBankTransComponent implements OnInit {

  public title: string = 'Registrar nuevo Movimiento Bancario';
  public titleEdit: string = 'Editar Movimiento Bancario';

  constructor(public modalService: ModalBankTransService, public formBankService:BankMovementsFormService) { }

  ngOnInit(): void {
  }

}
