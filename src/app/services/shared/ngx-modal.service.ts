import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class NgxModalService {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };
  constructor(private modalService: BsModalService) { }

  hide() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
  show(component) {
    this.modalRef = this.modalService.show(component, this.config);
  }

}
