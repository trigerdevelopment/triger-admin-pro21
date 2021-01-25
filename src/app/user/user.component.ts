import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../services/shared/upload.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   form: FormGroup;
   oculto:string = '';
   name:string='';
   text : string= '';
   select: boolean = false;
   selectedFile: File;
   currentFileUpload: File;
   progress: {percentage:number}= {percentage:0}
   type: string = '';
   retrievedImage: any;
   base64Data: any;
   retrieveResonse: any;
   message: string;
   imageName: any;


  constructor(public _fb: FormBuilder,
              public _uploadservice: UploadService,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      id : [""],
      name: ["Ed"],
      lastName: [""],
      age:[],
      createdDate: [""],
      total:[""],
      photoName:[""]
    });
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
          if ( this.type !== 'jpg' && this.type != 'png') {
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
          //  Swal.fire('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
        }
    }

      /*----------- Cancela enviar Archivo -------------*/
cancelFile() {
  this.name = '';
  this.text = "";
  console.log('Cancel File', this.selectedFile);
}



  submit(){
    this.form.get("photoName")?.setValue(this.name);
    console.log('FORM ', this.form.value);
    this._uploadservice.createUser(this.selectedFile, this.form.value).subscribe(res =>
      {
        console.log('RES ', res);

      })


  }

   //Gets called when the user clicks on retieve image button to get the image from back end
   getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/user/get-user/' + 1)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          console.log('USER ', this.retrieveResonse);

          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpg;base64,' + this.base64Data;
          console.log('IMG ', this.retrievedImage);

        }
      );
  }

}
