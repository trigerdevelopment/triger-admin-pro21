import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { UploadService } from '../shared/upload.service';

@Injectable({
  providedIn: 'root'
})
export class FormProductService {

  oculto: string = "";
  name: string = "";
  text: string = "";
  select: boolean = false;
  selectedFile: File;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  type: string = "";
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(public formBuilder: FormBuilder, public _upload: UploadService) { }

  form: FormGroup = this.formBuilder.group({
    id: [""],
    code: ["", Validators.required],

    productName: ["", Validators.required],

    unitPrice: ["", Validators.required],

    unitCost: ["", Validators.required],

    category: ["", Validators.required],

    subCategory: ["", Validators.required],

    photoName: [""],
  });

  /*----------- Selecciona Archivo AccountType en formato CSV para ser Enviado -------------*/
  onFileSelected(event: any) {
    console.log("EVENT ", event.target.files[0]);
    this.select = true;
    this.selectedFile = <File>event.target.files[0];
    try {
      this.name = this.selectedFile.name;
      this.text = "Nombre del Archivo para ser enviado :";
      this.type = this.selectedFile.name.split(".")[1];
      console.log(this.selectedFile.name.split(".")[1]);
      if (this.type !== "jpg" && this.type != "png") {
        console.log("ERROR!");
        this.cancelFile();
        Swal.fire({
          icon: "error",
          title: "Seleccin de Archivo",
          text: "Seleccione un Archivo JPG o PNG!",
          // footer: '<a href>Why do I have this issue?</a>'
        });
        this.select = false;
      } else {
        console.log("go ahead");
      }
    } catch (error) {
      console.log("ERROR EN ARCHIVO", error.error);
      this.cancelFile();
      //  Swal.fire('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
    }
  }

  onSubmit() {
    console.log("FORM ", this.form.value);
    const product: any = this.form.value;
    const formdata: FormData = new FormData();
    formdata.append("file", this.selectedFile);
    formdata.append("code", product.code);
    formdata.append("productName", product.productName);
    formdata.append("unitPrice", product.unitPrice);
    formdata.append("unitCost", product.unitCost);

    formdata.append("photoName", product.photoName);

    console.log("FORM DATA ", formdata);
    this._upload.createProduct(this.selectedFile, formdata).subscribe((res) => {
      console.log("RES ", res);
    });
  }

  /*----------- Cancela enviar Archivo -------------*/
  cancelFile() {
    this.name = "";
    this.text = "";
    console.log("Cancel File", this.selectedFile);
  }
}

