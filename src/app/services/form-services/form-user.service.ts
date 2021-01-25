import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../shared/upload.service';
import Swal from 'sweetalert2';
import { CrudService } from '../../services/shared/crud.service';
import { NuevoUsuario } from '../../models/nuevo-usuario';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FormUserService {

  users: NuevoUsuario[] = [];
  oculto: string = '';
  userId: boolean = false;
  name: string = '';
  text: string = '';
  select: boolean = false;
  selectedFile: File;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 }
  type: string = '';
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  passwordConfirm: string = '';

  constructor(public _formBuilder: FormBuilder,
    public _upload: UploadService,
    public _crud: CrudService,
    private _router: Router) { }


  form: FormGroup = this._formBuilder.group({
    id: [''],
    nombreUsuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
    passwordConfirm: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
    nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    apellido: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    // createdDate: ['',Validators.required],
    // historyDate: ['', Validators.required],
    roles: ['', Validators.required],
    enabled: [false],
    email: ['', [Validators.required, Validators.email]],
    // photoName:[''],

  });


  obtenerUsuarios() {
    return this._crud.getAllObjects('usuarios/get-usuarios').subscribe(res => {
      this.users = res;

    });
  }

  editUser(user: any) {

    this.userId = true;

    this.form.get('id')!.setValue(user.id);
    this.form.get('nombre')!.setValue(user.nombre);
    this.form.get('apellido')!.setValue(user.apellido);
    this.form.get('nombreUsuario')!.setValue(user.nombreUsuario);
    this.form.get('password')!.setValue('$QV<&v6E<eBTFZ]Q');
    this.form.get('passwordConfirm')!.setValue('$QV<&v6E<eBTFZ]Q');
    this.form.get('email')!.setValue(user.email);
    this.form.get('enabled')!.setValue(user.enabled);
    // this.form.get('roles')!.setValue(user.roles);
    // this.form.get('photoName')!.setValue(user.photoName);

  }



  /*----------- Selecciona Archivo AccountType en formato CSV para ser Enviado -------------*/
  onFileSelected(event: any) {
    console.log('EVENT ', event.target.files[0]);
    this.select = true;
    this.selectedFile = <File>event.target.files[0];
    try {
      this.name = this.selectedFile.name;
      this.text = "Nombre del Archivo para ser enviado :"
      this.type = this.selectedFile.name.split('.')[1];
      console.log(this.selectedFile.name.split('.')[1]);
      if (this.type !== 'jpg' && this.type != 'png') {
        console.log('ERROR!');
        this.cancelFile();
        Swal.fire({
          icon: 'error',
          title: 'Seleccin de Archivo',
          text: 'Seleccione un Archivo JPG o PNG!',
          // footer: '<a href>Why do I have this issue?</a>'
        });
        this.select = false;
      } else {
        console.log('go ahead');
      }
    } catch (error) {
      console.log('ERROR EN ARCHIVO', error.error);
      this.cancelFile();
      //  Swal.fire('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
    }
  }

  onSubmit() {
    if (this.userId) {
      this.passwordConfirm = this.form.get('password')?.value;
    }
    if (this.form.get('passwordConfirm').value === this.form.get('password')?.value) {
      this._crud.createObject(this.form.value, 'register/nuevo').subscribe(res => {
        this.users = res;
        Swal.fire({
          icon: 'success',
          title: 'Nuevo Usuario',
          text: 'Usuario guardado en la Base de Datos',
          // footer: '<a href>Why do I have this issue?</a>'

        });
        this.clearForm();
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Password',
        text: 'Las contraseñas no corresponden',
      });
    }

  }

  onEdit() {
    this.form.get('password').setValue('12345');
    this._crud.createObject(this.form.value, 'register/nuevo').subscribe(res => {
      this.users = res;
      Swal.fire({
        icon: 'success',
        title: 'Nuevo Usuario',
        text: 'Usuario guardado en la Base de Datos',
      });
      this.clearForm();
    })
  }

  confirmPassword(event: any) {
    this.passwordConfirm = event?.target.value;
  }

  /*----------- Cancela enviar Archivo -------------*/
  cancelFile() {
    this.name = '';
    this.text = "";
    console.log('Cancel File', this.selectedFile);
    this.passwordConfirm = '';
    this.form.pristine;
  }

  clearForm() {
    this.form.reset();
    this.form.get('password')?.setValue('');
    this.form.get('passwordConfrim').setValue('');
    this.userId = false;
    this.form.pristine;

  }



}
