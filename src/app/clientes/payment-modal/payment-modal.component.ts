import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/shared/modal.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  constructor(public _modalService: ModalService) { }

  ngOnInit(): void {
  }

  cerrarPaymentModal() {
    //  this.fileUploader.nativeElement.value = null;
      this._modalService.cerrarPaymentModal();
    }


}
