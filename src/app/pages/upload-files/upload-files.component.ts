import { Component, OnInit } from '@angular/core';
import { UploadFilesModalComponent } from 'src/app/modals/upload-files-modal/upload-files-modal.component';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  constructor(public ngxModalService: NgxModalService) { }

  ngOnInit(): void {
  }

  uploadFiles() {
    // this._modalService.mostrarMultipleFileUploadModal(this.idModal, this.URL_CUSTOMER);
    this.ngxModalService.show(UploadFilesModalComponent);
  }


}
