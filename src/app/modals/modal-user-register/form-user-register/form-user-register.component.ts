import { Component, OnInit } from '@angular/core';
import { FormUserService } from 'src/app/services/form-services/form-user.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CrudService } from '../../../services/shared/crud.service';
import Swal from 'sweetalert2';
import { error } from '@angular/compiler/src/util';
import { ModalService } from 'src/app/services/shared/modal.service';
declare function init_plugins() : void;


@Component({
  selector: 'app-form-user-register',
  templateUrl: './form-user-register.component.html',
  styleUrls: ['./form-user-register.component.css']
})
export class FormUserRegisterComponent implements OnInit {

   // product:Product;
   form: FormGroup;
   categories: any[] = [];
   subcategories: any[] = [];
   isActive:boolean=false;
   passwordConfirm: string = '';

     constructor(
               public _formUser: FormUserService,
               public _formBuilder: FormBuilder,
               public _crud: CrudService,
               public _modalService: ModalService
               // public _modalCategory: ModalService,
               // public _modalProduct: ModalProductService,
               // public _produccion: ProduccionService
               ) { }

   ngOnInit(): void {
     // this._formProduct.getCategories();
     // this._formProduct.getSubCategories();
     init_plugins();
     this.form  = this._formBuilder.group({
      id: [''],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      nombreUsuario: ['', Validators.required],
      email:[''],
      password: ['', Validators.required],
      enabled:[false, Validators.required],
      // photoName:[''],
      roles: ['']

    });
     this.addRoles();
     this.getCategories();

   }

   createRawRol(): FormGroup {
    return this._formBuilder.group({

    })
  }

  get roles(): FormArray {
    return this.form.get("roles") as FormArray;
  }

  addRoles() {
    this.roles.push(this.createRawRol());
  }

   onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

   mostrarModalCategory(){

   }


   getCategories() {
     // this._produccion.getCategories().subscribe(res => {
       // this.categories = res;
     // })

   }

   getSubCategories() {
     // this._produccion.getSubCategories().subscribe(res => {
       // this.subcategories = res;
     // })

   }

   confirmPassword(event:any){
     console.log('EVENT ', event.target);

     this.passwordConfirm = event?.target.value;
   }

   onSubmit(){
     console.log('FORM ', this.form.value);
    console.log('PASSWORD CONFIRM ', this.passwordConfirm);

    //  if(this.passwordConfirm === this.form.get('password')?.value){
    //    console.log('EL PASSWORD NO ES IGUAL');
       this._crud.createObject(this.form.value, 'register/nuevo').subscribe(res => {
         console.log('Respuesta', res);

       },
       (err)=>{
        console.log('ERROR', err)})

    //  }else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Password',
    //     text: 'Las contraseñas no corresponden',
    //     // footer: '<a href>Why do I have this issue?</a>'
    //   });
    //  }



   }



   valueForm(){


   }

   isEnabled(){
      this.isActive = true;
   }

   functionCheck(){

   }

}
