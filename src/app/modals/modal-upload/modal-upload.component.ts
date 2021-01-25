import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/shared/modal.service';
import { UploadService } from 'src/app/services/shared/upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  oculto:string = '';
  name:string='';
  text : string= '';
  select: boolean = false;
  selectedFile: File;
  currentFileUpload: File;
  progress: {percentage:number}= {percentage:0}
  type: string = '';
  isLoading:boolean=false;

  constructor(public _modalService: ModalService,
              public _uploadService: UploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this._modalService.cerrarModalUpload();
    this.select = false;
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


  this._modalService.tipo;
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

}
