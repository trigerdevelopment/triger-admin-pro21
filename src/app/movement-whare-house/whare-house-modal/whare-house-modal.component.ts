import { Component, OnInit } from '@angular/core';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';

@Component({
  selector: 'app-whare-house-modal',
  templateUrl: './whare-house-modal.component.html',
  styleUrls: ['./whare-house-modal.component.css']
})
export class WhareHouseModalComponent implements OnInit {


  constructor(
    private ngxModalService: NgxModalService,
    ) { }

ngOnInit() {

}

cerrarModal(){
this.ngxModalService.hide();
}

}
