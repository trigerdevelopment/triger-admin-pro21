import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { WharehouseService } from '../services/wharehouse.service';

@Injectable({
  providedIn: 'root'
})
export class WharehouseFormService {

  isEditable: boolean = false;
  total:number=0;
  materials: any[]=[];
  materials2: any[]=[];
  wharehouseMov:any= {
    'id':'',
    'fecha':'',
    'code':'',
    'product': '',
    'observations': '',
    'entrance':'',
    'issues': '',
    'unitCost': '',
    'totalCost':'',
  };

  constructor(
     public formBuilder: FormBuilder,
     public wharehouseService: WharehouseService,
     public productService: ProductService,
              ) { }

  form = this.formBuilder.group({
    id: [""],
    batch:[""],
    code: ["", Validators.required],
    fecha: ["", [Validators.required]],
    product: ["", Validators.required],
    observations: [""],
    entrance: ["",Validators.required],
    issues: ["", Validators.required],
    unitCost: ["",Validators.required],
    totalCost: [""],
  });

  edit(task: any) {

    this.isEditable = true;
    console.log('EDIT ', task);


    // this.form.get('requestby').setValue(this._authService.getUserDetails());
    this.form.get('id')!.setValue(task.id);
    this.form.get('code')!.setValue(task.code);
    if(task.batch !==null){
      this.form.get('batch')!.setValue(task.batch);
    }
    this.form.get('product')!.setValue(task.product);
    this.form.get('observations')!.setValue(task.observations);
    this.form.get('entrance')!.setValue(task.entrance);
    this.form.get('issues')!.setValue(task.issues);
    this.form.get('unitCost')!.setValue(task.unitCost);
    this.form.get('totalCost')!.setValue(task.totalCost);
    var date = this.getDate(task.fecha);
    console.log('DATE FROM MILLIS TO DATE  ', date);

    this.form.get('fecha').setValue(date);
    this.recalculateCost();

  }

  selectedCustomer(event: any){

    console.log('FORM ', this.form);
    console.log('FORM ', event);
    console.log('EVENT TARGET SELECTED INDEX ', event.target.selectedIndex);
    const resultado = this.materials[event.target.selectedIndex] ;
    console.log('RESULTADO ', resultado);
    this.form.get('code').setValue(resultado.code);
    this.form.get('unitCost').setValue(resultado.unitCost);

    console.log('FORM ', this.form);
    console.log('UNIT COST ', this.form.get('unitCost').value);
    this.recalculateCost();
  }

  keyupEntrance(){
    this.form.get('issues').setValue(0.00);
    this.total =  this.form.get('unitCost').value * this.form.get('entrance').value;
  }

  keyupIssues(){
    this.form.get('entrance').setValue(0.00);
    this.total =  this.form.get('unitCost').value * this.form.get('issues').value;
  }


  recalculateCost(){
   this.total =  this.form.get('unitCost').value * this.form.get('entrance').value;
  }

  getData(){
    this.productService.getRawMaterialByQuery('').subscribe(res => {
      this.materials = res;
   });

   this.productService.getProducts().subscribe(res => {

       this.materials2 = res;
       console.log('MATERIALS ', this.materials2);
       this.getPush();
     });

  }


  getPush(){
    console.log('LENGHT ', this.materials2.length);
    for(let i = 0; i < this.materials2.length; i++){
      this.materials.push(this.materials2[i]);
    }
    console.log('COONTENT  ', this.materials);


  }


  getDate(date) {

    var date2 = new Date(date);
    console.log('DATE 2 ', date2);
    console.log('YEAR  ', date2.getFullYear());
    console.log('MONTH ', date2.getMonth() + 1);
    console.log('DAY ', date2.getDay());
  var day =  date2.toLocaleString("en-US", {day: "numeric"})
  console.log('DAY ', day);


    // var parts = date.split("/")
    // console.log('PARTS 2', parts[2]);
    // console.log('PARTS 0', parts[0]);
    // console.log('PARTS 1', parts[1]);

    // return new Date(parts[2], parts[0]-1, parts[1]).toISOString().substring(0,10);
   /*------------- new Date(año, mes-1, dia) = yyyy/MM/dd   ------------*/
    return new Date(date2.getFullYear(), date2.getMonth(), parseInt(day)).toISOString().substring(0,10);
  }

  onCancel(){
    this.form.reset();
    this.total = 0;
    this.isEditable=false;
  }

  onSubmit(){

    console.log('FORM ' , this.form.value);
    this.form.get('totalCost').setValue(this.total);
    let custom = JSON.stringify(this.form.value);
   this.wharehouseService.addWhareHouseMov(this.form.value).subscribe(res => {
      console.log('resupesta ', res.message);
    })
    this.onCancel();

  }

}
