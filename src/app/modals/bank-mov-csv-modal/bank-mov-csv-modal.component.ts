import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/shared/modal.service';
import { UploadService } from 'src/app/services/shared/upload.service';
import { progressInfo } from '../multiple-file/multiple-file.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-mov-csv-modal',
  templateUrl: './bank-mov-csv-modal.component.html',
  styleUrls: ['./bank-mov-csv-modal.component.css']
})
export class BankMovCsvModalComponent implements OnInit {

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



  constructor(public _modalService: ModalService,
              public _uploadService: UploadService) { }

  ngOnInit(): void {
    this._uploadService.refreshSendFiles.subscribe(() => {

      // this.secuenceFile = this.secuenceFile + 1;
      this.preUploadFiles();
    })
  }

  cerrarModal() {
    this._modalService.cerrarModalUpload();
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
        if ( this.type != 'csv') {
          console.log('ERROR!');
          this.cancelFile();
          Swal.fire({
            icon: 'error',
            title: 'Seleccin de Archivo',
            text: 'Seleccione un Archivo CSV',
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


  this._modalService.tipo='csv';
  console.log('SWITCH', this._modalService.tipo);
  console.log('SWITCH', this._modalService.url);

  switch(this._modalService.tipo) {
    case 'customer': case 'proveedor':

      this._uploadService.sendXmlInvoice(this.selectedFile, this._modalService.url)
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

    break;

    case 'csv':
      this._modalService.url="product/upload-service"
      this._uploadService.pushFileToStorage(this.selectedFile, this._modalService.url)
      .subscribe(event => {

        if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total!);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
            // this.snackbarService.success(':: Proceso exitoso!');
            // Swal.fire({
            //   icon: 'success',
            //   title: 'Archivo de Banco',
            //   text: 'El Archivo se envio con exito',
            //   // footer: '<a href>Why do I have this issue?</a>'
            // });
            this.name='';
             //  this.getAllAccountType();
            // this.progress.percentage = 0;
              this._modalService.cerrarModalProveedor();
              this.progress.percentage=0;
              this.select = false;
              // this._router.navigate([this._modalService.url]);
          }
        });

    break;

  }


  }

  onFileChange(event) {
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


  cerrarMultipleModalUpload(){}

  borrarInput(){}


  uploadFiles(){

    this.selectedFiles.length

    this.progressInfos[this.secuenceFile] = { value: 0, fileName: this.selectedFiles[this.secuenceFile].name };
    console.log('SECUENCE FILE NUMBER ', this.secuenceFile);
    this.selectedFile = <File>this.selectedFiles[this.secuenceFile];
    this._uploadService.pushFileBankToStorage(this.selectedFile).subscribe(
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
    //   err => {
    //     console.log('ERROR AL CARGAR ARCHIVO');
    //     this.isError=true;
    //     this.errorFiles.push(this.selectedFile.name);
    //     // this.preUploadFiles();
    //   }
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
