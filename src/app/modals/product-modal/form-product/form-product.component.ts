import { Component, OnInit } from '@angular/core';
import { FormProductService } from 'src/app/services/form-services/form-product.service';
declare function init_plugins() : void;

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {

 // product:Product;
 categories: any[] = [];
 subcategories: any[] = [];

 constructor(
             public _formProduct: FormProductService,
             // public _modalCategory: ModalService,
             // public _modalProduct: ModalProductService,
             // public _produccion: ProduccionService
             ) { }

 ngOnInit(): void {
   init_plugins();
   // this._formProduct.getCategories();
   // this._formProduct.getSubCategories();
   this.getCategories();
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

 onSubmit(){

 }

}
