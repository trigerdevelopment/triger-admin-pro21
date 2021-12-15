import { EventEmitter, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/products';
import { ProduccionService } from '../services/produccion.service';
import { ProductService } from '../services/product.service';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class FormProductionService {

  public notificacion = new EventEmitter<any>();


  products: Product[] = [];
  totalCosto: number = 0;
  totalpzas: number = 0;

  production: {
    'id':'',
    'productName':'',
    'code':'',
    'batch':'',
    'product':'',
    'initialDate':'',
    'finalDate':'',
    'observation':'',
    'quantity':'',
    'cost':'',
    'totalCost':''

  }

  constructor(public formBuilder: FormBuilder,
              private _productionservice: ProduccionService,
              public productService: ProductService,) {

                this.getAllProducts();
                this.addMaterials();
              }

  createRawMaterials(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      codeProduct: [''],
      quantity: [''],
      rawmaterial:[''],
      unitCost: [''],
      total: ['']
    })
  }


 form:FormGroup = this.formBuilder.group({
  id: [""],
  // productName: [''],
  productName: this.formBuilder.group({

    id: ['', Validators.required]
  }),
  batch: ['', Validators.required],
  code: ['', Validators.required],
  product: [''],
  initialDate: ["", [Validators.required]],
  finalDate: ["", Validators.required],
  observation: [""],
  quantity: ["", [Validators.required]],
  cost: [""],
  totalCost: [""],
  rawMaterials: this.formBuilder.array([])
});



removeMaterials(id: number) {
  this.materials.removeAt(id);
 // var arrayControl = this.form.get("materials") as FormArray;
 // for (var i = 0; i < arrayControl.length; i++) {
 //   this.raw[i] = <Raw>arrayControl.controls[i].value;
 // }
 this.itemsCalculation();
}

get materials(): FormArray {
  return this.form.get("rawMaterials") as FormArray;
}

addMaterials() {
  this.materials.push(this.createRawMaterials());
}

getAllProducts() {
  this.productService.getProductsByQuery('').subscribe(res => {
    this.products = res.content;
    console.log("PRODUCTS ", this.products);

  });
}

itemsCalculation() {
  console.log('FORM ', this.form.controls.rawMaterials.value);
  var arrayControl = this.form.get("rawMaterials") as FormArray;
  if( this.form.get("quantity").value !== 0) {

    this.totalCosto = 0;
    for (var i = 0; i < arrayControl.length; i++) {

      this.totalCosto = this.totalCosto + arrayControl.controls[i].value.total;

    }
    this.totalpzas = this.form.get("quantity").value;
    this.form.get("totalCost").setValue(this.totalCosto);
    this.form.get("cost").setValue(this.totalCosto / this.totalpzas);
  } else {
  console.log('AGREGE LA CANTIDAD A PRODUCIR');

  }
}


selectCode(event){
  this.getAllProducts();
  console.log('SELECT CODE ', event );
  // const resultado = this.products.find( res => res.id === event.target.selectedIndex);
  const resultado = this.products[event.target.selectedIndex];
  console.log('RESULTADO ', resultado);
  this.form.get('code').setValue(resultado.code);
  this.form.get('product').setValue(resultado.name);

}

selectedItem(event, data, id) {
  console.log('VALOR DE ID ', id);
  console.log('EVENT ', data);
  console.log('EVENT TARGET ', event.target);
  console.log('EVENT TARGET VALUE ', event.target.value);
  console.log('EVENT SRCELEMENT SELECTED INDEX ', event.srcElement.selectedIndex);
  console.log('EVENT TARGET SELECTED INDEX ', event.target.selectedIndex);
  var cant = 10;
  // const resultado = this.products.find( res => res[event.target.selectedIndex] === event.target.selectedIndex);
  console.log('RESULTADO ', this.products[event.target.selectedIndex]);
  const resultado = this.products[event.target.selectedIndex];


  var arrayControl = this.form.get("rawMaterials") as FormArray;
    console.log('FORM CONTROL ', this.form.controls);
    console.log('FORM RAWMATERIAL', this.form.controls.rawMaterials.value[id].rawmaterial);
    console.log('FORM QUANTITY', this.form.controls.rawMaterials.value[id].quantity);

    console.log('FORM DATA ', data);
    console.log('QUANTITY ', arrayControl.controls[id].value.quantity);

    if(arrayControl.controls[id].value.quantity > 0) {
      console.log('FORM ARRAY ', arrayControl.controls[id].value.rawmaterial);
      arrayControl.controls[id].get('codeProduct').setValue(resultado.code);
     arrayControl.controls[id].get('unitCost').setValue(resultado.unitCost);
      arrayControl.controls[id].get('total').setValue(arrayControl.controls[id].value.quantity *
        arrayControl.controls[id].value.unitCost);

      // console.log('FORM ARRAY SET VALUE ', arrayControl.controls[id].get('quantity').setValue(2));
    }else {

   //   this.snackbar.fail('Agregar la cantidad utilizada de materia prima ');
      arrayControl.controls[id].get('rawmaterials').setValue('');
    }

  //  this.raw[id] = <Raw>arrayControl.controls[id].value;
  //  this.raw[id].costo = data.unitCost;
  //  this.raw[id].total = this.raw[id].quantity * this.raw[id].costo;
  //  arrayControl.controls[id].setValue(this.raw[id]);

   this.itemsCalculation();
}

recalculateCost() {
  var arrayControl = this.form.get("rawMaterials") as FormArray;
  if (arrayControl.length > 0) {
    this.itemsCalculation();
  }
}




inputChange(event: any, id) {


  console.log('I ',id);
  var arrayControl = this.form.get("rawMaterials") as FormArray;
  if(arrayControl.controls[id].value.unitCost > 0 ) {

          arrayControl.controls[id].get('total').setValue(arrayControl.controls[id].value.quantity *
            arrayControl.controls[id].value.unitCost);
            this.itemsCalculation();
  }

}




onSubmit(){
  console.log('FORM ', this.form);
  let myDate = this.getDate(this.form.get('initialDate').value);
  this.form.get('initialDate').setValue(myDate);
 // this.form.get('initialDate').setValue(this.getDate(date.target.value));
  console.log('FORM ', this.form);

  let myDate2 = this.getDate(this.form.get('finalDate').value);
  this.form.get('finalDate').setValue(myDate2);
 // this.form.get('initialDate').setValue(this.getDate(date.target.value));
  console.log('FORM ', this.form);


  let resource = JSON.stringify(this.form.value);
  this._productionservice.addProduction(resource).subscribe(res=> {
    console.log('production ', res);
    this.cleanForm();
    Swal.fire({
      icon: "success",
      text: "Los datos se han enviado con exito",
      title: "Envio al Servidor"
    });
    this.notificacion.emit(res);

  });



}

cleanForm(){
  this.form.get('initialDate').setValue('');
  this.form.reset();
//  console.log('ARRAY LENGHT', this.materials.length);

}

formatInitialDate() {


 }

 formatFinalDate() {

 }

  getDate(date) {

    var parts = date.split("-")
    console.log('PARTS ', parts);
    return new Date(parts[0], parts[1] - 1, parts[2])

  }


}
