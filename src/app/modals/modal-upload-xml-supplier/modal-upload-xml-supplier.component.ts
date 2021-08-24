import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QueryService } from 'src/app/customer/query.service';
import { ModalService } from 'src/app/services/shared/modal.service';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { UploadService } from 'src/app/services/shared/upload.service';

import { SupplierInvoiceState } from 'src/app/supplier/store/reducers/supplier-invoice.reducer';
import * as InvoiceSupplierActions from '../../supplier/store/actions/supplier-invoice.actions';
import Swal from 'sweetalert2';
export class  progressInfo {
  value : number=0;
  fileName:string;
}

@Component({
  selector: 'app-modal-upload-xml-supplier',
  templateUrl: './modal-upload-xml-supplier.component.html',
  styleUrls: ['./modal-upload-xml-supplier.component.css']
})
export class ModalUploadXmlSupplierComponent implements OnInit {

  query:string;
  progressInfos: progressInfo[] = [];
  selectedFiles: any[] = [];
  oculto:string = '';
  name:string='';
  text : string= '';
  select: boolean = false;
  selectedFile: File;
  currentFileUpload: File;
  progress: {percentage:number}= {percentage:0}
  type: string = '';
  isLoading:boolean=false;
  uploadForm = new FormGroup({
    //  name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });
  errorFiles: any[] =[];
  isError:boolean = false;
  secuenceFile: number = 0;
  @ViewChild('fileUploader') fileUploader: ElementRef;



  constructor(
              //  public _modalService: ModalService,
               public _modalService: NgxModalService,
               public _uploadService: UploadService,
               private queryService: QueryService,
               private store: Store<SupplierInvoiceState>,
    ) { }

  ngOnInit(): void {
    this._uploadService.refreshSendFiles.subscribe(() => {

      // this.secuenceFile = this.secuenceFile + 1;
      this.preUploadFiles();
    })
  }

  cerrarModal() {
    // this._modalService.cerrarModalUpload();
    this.select = false;
  }


  preUploadFiles() {
    console.log('SECUENCE ', this.secuenceFile);
    console.log('FILE LENGHT ', this.selectedFiles.length);
    this.secuenceFile = this.secuenceFile + 1;

    if (this.secuenceFile < this.selectedFiles.length) {
      this.uploadFiles();
    } else {
      console.log('TERMINO CON EL ENVIO DE FACTURAS');
      this.secuenceFile = 0;
      this.fileUploader.nativeElement.value = null;
      // this._uploadService.refreshForInvoice.next();
      this.select = false;
      // this.deleteAllFiles();

      //  this.selectedFiles=null;

    }
  }


     /*----------- Selecciona Archivo AccountType en formato CSV para ser Enviado -------------*/
     onFileSelected(event:any) {
      console.log('EVENT ', event.target.files[0]);
      this.progress.percentage = 0;
      this.select = true;
      this.selectedFile = <File>event.target.files[0];
      try {
        this.name = this.selectedFile.name;
        this.text = "Nombre del Archivo para ser enviado :"
        this.type = this.selectedFile.name.split('.')[1];
        console.log(this.selectedFile.name.split('.')[1]);
        if ( this.type !== 'xml' && this.type != 'csv') {
          console.log('ERROR!');
          this.cancelFile();
          Swal.fire({
            icon: 'error',
            title: 'Seleccin de Archivo',
            text: 'Seleccione un Archivo CSV o XML!',
            // footer: '<a href>Why do I have this issue?</a>'
          });
            this.select = false;
      } else {
          console.log('go ahead');
        }
      } catch (error) {
        console.log('ERROR EN ARCHIVO',error.error);
        this.cancelFile();
         Swal.fire('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
      }
  }

   /*----------- Cancela enviar Archivo -------------*/
cancelFile() {
  this.name = '';
  this.text = "";
  console.log('Cancel File', this.selectedFile);
}



subirArchivo(){
  this.isLoading=true;
  this.progress.percentage = 0;
  this.currentFileUpload = this.selectedFile;

      this._uploadService.sendXmlInvoice(this.selectedFile, '/invoice/supplier-xml-file')
      .subscribe(event => {

        if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total!);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');

        //     // this.snackbarService.success(':: Proceso exitoso!');
        console.log('EVENT ', event);

        Swal.fire({
          icon: 'success',
          title: 'Archivo de Banco',
          text: 'El Archivo se envio con exito',
          // footer: '<a href>Why do I have this issue?</a>'
        });
       // this.isLoading=false;
            this.name='';
        //      //  this.getAllAccountType();
        //     // this.progress.percentage = 0;
              // this._modalService.cerrarModalProveedor();
              this.progress.percentage=0;
              this.select = false;
              this.isLoading=false;
              console.log('FINISSHHHH');
              this._uploadService.refreshForInvoice.next();

        //       // this._router.navigate([this._modalService.url]);
          }
        });



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

  borrarUnArchivo(index) {
    this.selectedFiles.splice(index, 1);
    this.progressInfos.splice(index, 1);
    this.secuenceFile = this.secuenceFile+1
    console.log('FILES DELETE ', this.selectedFiles);

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


  cerrarMultipleModalUpload(){

    this._modalService.hide();
    this.fileUploader.nativeElement.value = null;
    this.deleteAllFiles();
    this.query = this.queryService.createFilterUrl(
      { iniDate: '', finalDate: '', iniFolio: 0, finalFolio: '', company:'', sucursal:'', total:null, total2:null, pageNo:null,pageSize:null,sortBy:'',orderBy:true })
      this.store.dispatch(InvoiceSupplierActions.loadSupplierInvoices({ query: this.query }))

  }

  borrarInput(){}


  uploadFiles(){

    this.selectedFiles.length

    this.progressInfos[this.secuenceFile] = { value: 0, fileName: this.selectedFiles[this.secuenceFile].name };
    console.log('SECUENCE FILE NUMBER ', this.secuenceFile);
    this.selectedFile = <File>this.selectedFiles[this.secuenceFile];
    this._uploadService.pushFileToStorage(this.selectedFile,'cfdi/supplier-xml-file').subscribe(
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
      err => {
        console.log('ERROR AL CARGAR ARCHIVO');
        this.isError=true;
        this.errorFiles.push(this.selectedFile.name);
        // this.preUploadFiles();
      }
    );

    // console.log('FINAL FINAL -------------------------');
    // console.log('ERROR FILES ', this.errorFiles);

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


}
