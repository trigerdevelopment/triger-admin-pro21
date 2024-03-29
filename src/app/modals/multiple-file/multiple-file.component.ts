import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QueryService } from 'src/app/customer/query.service';
import { InvoiceState } from 'src/app/customer/store/reducers/invoice.reducer';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { UploadService } from 'src/app/services/shared/upload.service';
import { environment } from 'src/environments/environment';
import * as InvoiceActions from '../../customer/store/actions/invoice.actions';


export class  progressInfo {
  value : number=0;
  fileName:string;
}
@Component({
  selector: 'app-multiple-file',
  templateUrl: './multiple-file.component.html',
  styleUrls: ['./multiple-file.component.css']
})
export class MultipleFileComponent implements OnInit {

  query:string;
  selectedFiles: any[] = [];
  progressInfos: progressInfo[] = [];

  secuenceFile: number = 0;
  selectedFile: File;
  errorFiles: any[] =[];
  @ViewChild('fileUploader') fileUploader: ElementRef;
  select: boolean = false;
  isError:boolean = false;
  uploadForm = new FormGroup({
    //  name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });

  constructor(public _modalService: NgxModalService,
    public _uploadService: UploadService,
    private formBuilder: FormBuilder,
    private store: Store<InvoiceState>,
    private queryService: QueryService) {

  }

  ngOnInit(): void {
    // this.fileInfos = this._uploadService.getFiles();
   this.secuenceFile = 0;

    // this.progressInfos[this.secuenceFile] = { value: 0, fileName:'' };
    this._uploadService.refreshSendFiles.subscribe(() => {

      // this.secuenceFile = this.secuenceFile + 1;
      this.preUploadFiles();
    })
  }

  preUploadFiles() {
    console.log('SECUENCE ', this.secuenceFile);
    console.log('FILE LENGHT ', this.selectedFiles.length);
    this.secuenceFile = this.secuenceFile + 1;

    if (this.secuenceFile < this.selectedFiles.length) {
      this.upload();
    } else {
      console.log('TERMINO CON EL ENVIO DE FACTURAS');
      this.secuenceFile = 0;
      this.fileUploader.nativeElement.value = null;
      // this._uploadService.refreshForInvoice.next();
      this.select = false;
      // this.deleteAllFiles();

      //  this.selectedFiles=null;
      this.query = this.queryService.createFilterUrl(
        { iniDate: '', finalDate: '', iniFolio: 0, finalFolio: '', company:'', sucursal:'', total:null, total2:null, pageNo:null,pageSize:null,sortBy:'',orderBy:true })
        // this.store.dispatch(InvoiceActions.loadInvoices({ query: this.query }))
    }
  }


  onFileChange(event) {
    this.select=true;
    for (var i = 0; i < event.target.files.length; i++) {
      this.selectedFiles.push(event.target.files[i]);
    }

    console.log('files ', this.selectedFiles);
    for(let i = 0; i < this.selectedFiles.length; i++){
      this.progressInfos[i] = { value: null, fileName: this.selectedFiles[i].name };

     }

  }

  submitForm() {

    const formData = new FormData();
    for (var i = 0; i < this.selectedFiles.length; i++) {
      formData.append("file[]", this.selectedFiles[i]);
    }

    // this.httpClient.post(this.URL, formData).subscribe(res =>  {
    //     console.log(res);
    //     alert('Files uploaded Successfully!');
    // })
  }

  cerrarMultipleModalUpload() {
  //  this.fileUploader.nativeElement.value = null;
    this._modalService.hide();
    this.fileUploader.nativeElement.value = null;
    this.deleteAllFiles();
    this.query = this.queryService.createFilterUrl(
      { iniDate: '', finalDate: '', iniFolio: 0, finalFolio: '', company:'', sucursal:'', total:null, total2:null, pageNo:null,pageSize:null,sortBy:'',orderBy:true })
      this.store.dispatch(InvoiceActions.loadInvoices({ query: this.query }))

  }

  borrarUnArchivo(index) {
    this.selectedFiles.splice(index, 1);
    this.progressInfos.splice(index, 1);
    this.secuenceFile = this.secuenceFile+1
    console.log('FILES DELETE ', this.selectedFiles);

  }

  uploadFiles() {


    // for (let i = 0; i < this.selectedFiles.length; i++) {
    //   this.upload(i, this.selectedFiles[i]);
    //   console.log('CURRENT I ', i);

    // }
    this.upload();
  }

  upload() {

    this.selectedFiles.length

    this.progressInfos[this.secuenceFile] = { value: 0, fileName: this.selectedFiles[this.secuenceFile].name };

    console.log('SECUENCE FILE NUMBER ', this.secuenceFile);

    this.selectedFile = <File>this.selectedFiles[this.secuenceFile];



    // for(let i = 0; i < this.selectedFiles.length; i++){
    //  this.progressInfos[i] = { value: null, fileName: this.selectedFiles[i].name };

    // }



    this._uploadService.upload(this.selectedFile).subscribe(

      event => {
        if (event.type === HttpEventType.UploadProgress) {

          this.progressInfos[this.secuenceFile].value = Math.round(100 * event.loaded / event.total);
           console.log('THIS PROGRESSS ', this.progressInfos[this.secuenceFile].value);

        } else if (event instanceof HttpResponse) {
          // this.fileInfos = this._uploadService.getFiles();
          this._uploadService.refreshSendFiles.next();
          console.log('TERMINO LA SECUENCIA DE ENVIO ');
        }
        // if(this.progressInfos[i].value === 100){

        //   i++
        // }

      },
      err => {
        console.log('ERROR AL CARGAR ARCHIVO');
        this.isError=true;
        this.errorFiles.push(this.selectedFile.name);
        this.preUploadFiles();
      }
    );


    console.log('FINAL FINAL -------------------------');
    console.log('ERROR FILES ', this.errorFiles);
  }

  borrarInput() {
    console.log('FILE UPLOADER ', this.fileUploader.nativeElement);

    this.fileUploader.nativeElement.value = null;

  }

  deleteAllFiles(){
    this.progressInfos.splice(0, this.progressInfos.length);
    this.selectedFiles.splice(0, this.selectedFiles.length);
    this.errorFiles.splice(0, this.errorFiles.length);
    this.fileUploader.nativeElement.value = null;
    this.isError=false;
    // for(let i=0; i< this.selectedFiles.length; i++){
    //   this.selectedFiles.splice(i, 1);
    // }
  }

}
