import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/shared/modal.service';
import { UploadService } from 'src/app/services/shared/upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-multiple-upload-modal',
  templateUrl: './multiple-upload-modal.component.html',
  styleUrls: ['./multiple-upload-modal.component.css']
})
export class MultipleUploadModalComponent implements OnInit {
  public demoForm: FormGroup;

  selectedFiles: FileList;
  filesArr:File[]=[];
  errorFiles: any[] =[];
  selectedFile: File;
  progressInfos = [];
  arr=[];
  message = '';
  secuenceFile:any = 0;
  @ViewChild('fileUploader') fileUploader:ElementRef;
  fileInfos: Observable<any>;

  select:boolean=false;

  constructor(public _modalService:ModalService,
              public _uploadService: UploadService,
              private formBuilder: FormBuilder) {

                this.demoForm = this.formBuilder.group({
                  text_input: ['', Validators.required],
                  photos: this.formBuilder.array([])
               });

               }

  ngOnInit(): void {
    // this.fileInfos = this._uploadService.getFiles();
    this._uploadService.refreshSendFiles.subscribe(()=>{

      // this.secuenceFile = this.secuenceFile+1;
      this.preUploadFiles();
    })

    this._uploadService.refreshNeeded$.subscribe(()=> {

    })
  }

  onSubmit() {
    // console.log(f.value);  // { first: '', last: '' }
    console.log('FILES ARRAY ', this.filesArr);

     // false
  }



  cerrarMultipleModalUpload(){
    this.fileUploader.nativeElement.value = null;
    this._modalService.cerrarMultipleModalUpload();
  }

  subirArchivo(){

  }

  selectFiles(event) {
    this.select=true;
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.filesArr = Array.from(this.selectedFiles);
    // this.filesArr = Array.from(this.selectedFiles);
    console.log('SELECTED FILES ', this.selectedFiles.length);
    console.log(' FILES ARRAY ', this.filesArr);

    console.log('FORM ');
    if(this.selectedFiles.length > 50) {
      Swal.fire({
        icon: 'error',
        title: 'Maximo de Archivos',
        text: 'Seleccione maximo 50 archivos!',
        // footer: '<a href>Why do I have this issue?</a>'
      });
      this.borrarInput();
    }
    // console.log('SELECTED FILES ', this.selectFiles[2].name);
    // document.getElementById("uploadCaptureInputFile"). = "";

  }

  uploadFiles() {
    this.message = '';

    // for (let i = 0; i < this.selectedFiles.length; i++) {
    //   this.upload(i, this.selectedFiles[i]);
    //   console.log('CURRENT I ', i);

    // }
    this.upload();
  }

  borrarInput(){
    console.log('FILE UPLOADER ', this.fileUploader.nativeElement);

    this.fileUploader.nativeElement.value = null;

  }

  something_happens(input) {
    input.replaceWith(input.val('').clone(true));
};


  preUploadFiles(){
    this.secuenceFile = this.secuenceFile+1;
    if(this.secuenceFile < this.selectedFiles.length){
      this.upload();
    }else {
     console.log('TERMINO CON EL ENVIO DE FACTURAS');
     this.secuenceFile = 0;
    //  this.progressInfos=[];
    //  this.selectedFiles=null;
    }
  }

  upload() {

    this.selectedFiles.length

      this.progressInfos[this.secuenceFile] = { value: 0, fileName: this.selectedFiles[this.secuenceFile].name };

      console.log('SECUENCE FILE NUMBER ', this.secuenceFile);

      this.selectedFile = <File>this.selectedFiles[this.secuenceFile];

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
        // this.progressInfos[this.secuenceFile].value = 0;
        this.message = 'Could not upload the file:' + this.selectedFiles[this.secuenceFile].name;
        this.errorFiles.push(this.selectedFile.name);
        this.preUploadFiles();
      }
      );
            console.log('FINAL FINAL -------------------------');
            console.log('ERROR FILES ', this.errorFiles);


  }

borrarUnArchivo(index){
console.log('INDEX ', index);

  console.log(this.selectedFiles.item);

}

createItem(data): FormGroup {
  return this.formBuilder.group(data);
}


//Help to get all photos controls as form array.
get photos(): FormArray {
  console.log(this.demoForm);
  return this.demoForm.get('photos') as FormArray;
};

detectFiles(event) {
  let files = event.target.files;
  if (files) {
    for (let file of files) {
      let reader = new FileReader();
      // reader.onload = (e: any) => {
      //   console.log("e.target.result", e.target.result);
      //     this.photos.push(this.createItem({
      //         file,
      //         // url: e.target.result  //Base64 string for preview image
      //     }));
      // }
      this.photos.push(file);
      reader.readAsDataURL(file);
    }
  }
}

removePhoto(i){
  this.photos.removeAt(i);
}



}
