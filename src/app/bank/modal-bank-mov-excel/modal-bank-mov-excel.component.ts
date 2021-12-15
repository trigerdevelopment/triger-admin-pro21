import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BankService } from 'src/app/services/bank.service';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { UploadService } from 'src/app/services/shared/upload.service';
import { progressInfo } from '../../modals/multiple-file/multiple-file.component';
import * as BankActions from '../store/actions/bank.transactions.actions';
import { BankMovState } from '../store/reducers/bank.transactions.reducers';

@Component({
  selector: 'app-modal-bank-mov-excel',
  templateUrl: './modal-bank-mov-excel.component.html',
  styleUrls: ['./modal-bank-mov-excel.component.css']
})
export class ModalBankMovExcelComponent implements OnInit {

  uploadForm = new FormGroup({
    //  name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });

  isError:boolean=false;
  selectedFiles: any[] = [];
  progress: {percentage:number}= {percentage:0}
  progressInfos: progressInfo[] = [];
  select: boolean = false;
  selectedFile: File;
  secuenceFile: number = 0;


  constructor(public _uploadService: UploadService, public bankService: BankService,
    public ngxModalService: NgxModalService,  private store: Store<BankMovState>,) { }

  ngOnInit(): void {
  }

  onFileChange(event){
    this.select=true;

    for (var i = 0; i < event.target.files.length; i++) {
      this.selectedFiles.push(event.target.files[i]);
    }

    this.selectedFile = <File>event.target.files[0];
    console.log('files ', this.selectedFiles);
    console.log('files 0 ', this.selectedFiles[0].name);
    for(let i = 0; i < this.selectedFiles.length; i++){
      this.progressInfos[i] = { value: null, fileName: this.selectedFiles[i].name };

     }

  }

  cerrarMultipleModalUpload(){
    this.ngxModalService.hide();
    this.store.dispatch(BankActions.loadBankTransactionsByQuery({ query: ''}));

  }

  deleteFile(){}

  submitForm(){}

  borrarInput(){}

  uploadFiles(){


    this.selectedFiles.length

    this.progressInfos[this.secuenceFile] = { value: 0, fileName: this.selectedFiles[this.secuenceFile].name };
    console.log('SECUENCE FILE NUMBER ', this.secuenceFile);
    this.selectedFile = <File>this.selectedFiles[this.secuenceFile];
    this.bankService.pushFileBankToStorage(this.selectedFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {

          this.progressInfos[this.secuenceFile].value = Math.round(100 * event.loaded / event.total);
           console.log('THIS PROGRESSS ', this.progressInfos[this.secuenceFile].value);

        } else if (event instanceof HttpResponse) {
          // this.fileInfos = this._uploadService.getFiles();
          this._uploadService.refreshSendFiles.next();
          console.log('TERMINO LA SECUENCIA DE ENVIO ');
        }
       },

    );

 }


 borrarUnArchivo(index){}

}




