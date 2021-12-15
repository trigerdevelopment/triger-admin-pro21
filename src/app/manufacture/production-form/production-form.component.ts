import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/products';
import { ProduccionService } from 'src/app/services/produccion.service';
import { ProductService } from 'src/app/services/product.service';
import { FormProductionService } from '../form-production.service';
import Swal from "sweetalert2";
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.css']
})
export class ProductionFormComponent implements OnInit {

  form: FormGroup;
  products: Product[];
  rawMaterials:any[];
  totalCosto: number = 0;
  totalpzas: number = 0;
  ini:number=1;
  production:any;
  iniDate:any = new Date();
  result:any;
  arrayControl: FormArray;


  constructor(
    public _form: FormProductionService,
    private _productionservice: ProduccionService,
    private _inventoryService: InventoryService,
    private productService: ProductService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
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
      itemRawMaterials: this.formBuilder.array([])
    });
    this.addMaterials();
    this.getAllProducts();
    this.getRawMaterials();
  }

  createRawMaterials(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      codeProduct: ['',Validators.required],
      quantity: ['',Validators.required],
      rawMaterialName:['',Validators.required],
      unitCost: ['',Validators.required],
      total: ['']
    })
  }


removeMaterials(id: number) {
  this.materials.removeAt(id);
 // var arrayControl = this.form.get("materials") as FormArray;
 // for (var i = 0; i < arrayControl.length; i++) {
 //   this.raw[i] = <Raw>arrayControl.controls[i].value;
 // }
 this.itemsCalculation();
}

get materials(): FormArray {
  return this.form.get("itemRawMaterials") as FormArray;
}

addMaterials() {
  this.materials.push(this.createRawMaterials());
}

getAllProducts() {
  this.productService.getProductsByQuery('').subscribe(res => {
    this.products = res.content;

  });

}
getRawMaterials() {

  this._inventoryService.getRawMaterial('').subscribe(res => {
    this.rawMaterials = res;
  })
}

itemsCalculation() {
  var arrayControl = this.form.get("itemRawMaterials") as FormArray;
  if( this.form.get("quantity").value !== 0) {

    this.totalCosto = 0;
    for (var i = 0; i < arrayControl.length; i++) {

      this.totalCosto = this.totalCosto + arrayControl.controls[i].value.total;

    }
    this.totalpzas = this.form.get("quantity").value;
    this.form.get("totalCost").setValue(this.totalCosto);
    this.form.get("cost").setValue(this.totalCosto / this.totalpzas);
  } else {

  }
}


selectCode(event){

  // console.log('SELECT CODE ', event.target.selectedIndex);
  const resultado = this.products[event.target.selectedIndex-1];
  console.log('RESULTADO ', resultado);

  this.form.get('code').setValue(resultado.code);
  this.form.get('product').setValue(resultado.name);

}

selectedItem(event, data, id) {

  // console.log('VALOR DE ID ', id);
  // console.log('EVENT ', data);
  // console.log('EVENT TARGET ', event.target);
  // console.log('EVENT TARGET VALUE ', event.target.value);
  // console.log('EVENT SRCELEMENT SELECTED INDEX ', event.srcElement.selectedIndex);
  // console.log('EVENT TARGET SELECTED INDEX ', event.target.selectedIndex);
  var cant = 10;
  // const resultado = this.products.find( res => res[event.target.selectedIndex] === event.target.selectedIndex);
  // console.log('RESULTADO ', this.rawMaterials[event.target.selectedIndex]);
  // const resultado = this.products[event.target.selectedIndex];
  this.result = this.rawMaterials[event.target.selectedIndex];


  // var arrayControl = this.form.get("rawMaterials") as FormArray;
   this.arrayControl = this.form.get("itemRawMaterials") as FormArray;

    // console.log('FORM CONTROL ', this.form.controls);
    // console.log('FORM RAWMATERIAL', this.form.controls.rawMaterials.value[id].rawmaterial);
    // console.log('FORM QUANTITY', this.form.controls.rawMaterials.value[id].quantity);

    // console.log('FORM DATA ', data);
    // console.log('QUANTITY ', this.arrayControl.controls[id].value.quantity);

    if(this.arrayControl.controls[id].value.quantity > 0) {
      console.log('FORM ARRAY ', this.arrayControl.controls[id].value.rawmaterial);
      this.arrayControl.controls[id].get('codeProduct').setValue(this.result.code);
     this.arrayControl.controls[id].get('unitCost').setValue(this.result.unitCost);
      this.arrayControl.controls[id].get('total').setValue(this.arrayControl.controls[id].value.quantity *
        this.arrayControl.controls[id].value.unitCost);

      // console.log('FORM ARRAY SET VALUE ', arrayControl.controls[id].get('quantity').setValue(2));
    }else {

   //   this.snackbar.fail('Agregar la cantidad utilizada de materia prima ');
      // arrayControl.controls[id].get('rawmaterials').setValue('');
    }

  //  this.raw[id] = <Raw>arrayControl.controls[id].value;
  //  this.raw[id].costo = data.unitCost;
  //  this.raw[id].total = this.raw[id].quantity * this.raw[id].costo;
  //  arrayControl.controls[id].setValue(this.raw[id]);
    console.log('FOMR ' ,this.form.value);

   this.itemsCalculation();
}

recalculateCost() {
  var arrayControl = this.form.get("itemRawMaterials") as FormArray;
  if (arrayControl.length > 0) {
    this.itemsCalculation();
  }
}




inputChange(event: any, id) {

console.log('RESULT ', this.result);
console.log('ARRAY CONTROL ', this.arrayControl);
if(this.arrayControl){
  this.arrayControl.controls[id].get('unitCost').setValue(this.result.unitCost);
  this.arrayControl.controls[id].get('codeProduct').setValue(this.result.codeProduct);
  this.arrayControl.controls[id].get('total').setValue(this.arrayControl.controls[id].value.quantity *
      this.arrayControl.controls[id].value.unitCost);
}

  console.log('I ',id);

        this.itemsCalculation();
}


inputUnitCost(event: any,id){
  this.arrayControl.controls[id].get('total').setValue(this.arrayControl.controls[id].value.quantity *
    this.arrayControl.controls[id].value.unitCost);
}




onSubmit(){
  console.log('FORM ', this.form);
  this.iniDate = this.getDate(this.form.get('initialDate').value);
  this.form.get('initialDate').setValue(this.iniDate);
 // this.form.get('initialDate').setValue(this.getDate(date.target.value));
  console.log('FORM ', this.form);

  let myDate2 = this.getDate(this.form.get('finalDate').value);
  this.form.get('finalDate').setValue(myDate2);
 // this.form.get('initialDate').setValue(this.getDate(date.target.value));
  console.log('FORM ', this.form);


  // this.production = JSON.stringify(this.form.value);
  console.log('FORMA ANTES DE SER ENVIADA ', this.production);
  console.log('FORMA ANTES DE SER ENVIADA ', this.form);

  this._productionservice.addProduction(this.form.value).subscribe(res=> {
    // console.log('production ', res);


  },
  error => {
    Swal.fire({
      icon: "error",
      text: "error!" + `${error.error}`,
      title: "Error al enviar Datos"
    });
    this.cleanForm();
  },
  () => {
    // 'onCompleted' callback.
    // No errors, route to new page here
    this.cleanForm();
    Swal.fire({
      icon: "success",
      text: "Los datos se han enviado con exito",
      title: "Envio al Servidor"
    });

  }
  );



}

cleanForm(){
  this.form.get('initialDate').setValue('');
  this.form.reset();
  var arrayControl = this.form.get("invoiceItems") as FormArray;
  for (var i = 0; i < this.arrayControl.length; i++) {
    this.arrayControl.controls[i].get("rawMaterialName").setValue("");
    this.arrayControl.controls[i].get("codeProduct").setValue("");
    this.arrayControl.controls[i].get("quantity").setValue("");
    this.arrayControl.controls[i].get("total").setValue("");
    this.arrayControl.controls[i].get("unitCost").setValue("");
    this.materials.removeAt(i + 1);
  }
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
