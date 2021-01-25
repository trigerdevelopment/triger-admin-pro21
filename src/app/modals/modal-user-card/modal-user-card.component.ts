import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/shared/modal.service';

@Component({
  selector: 'app-modal-user-card',
  templateUrl: './modal-user-card.component.html',
  styleUrls: ['./modal-user-card.component.css']
})
export class ModalUserCardComponent implements OnInit {

  title: string = "Detalle de Usuario"

  constructor(public _modalService: ModalService) { }

  ngOnInit(): void {
  }

}
