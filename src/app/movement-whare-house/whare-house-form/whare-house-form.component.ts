import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormInvoiceService } from 'src/app/services/form-services/form-invoice.service';
import { ProductService } from 'src/app/services/product.service';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { UploadService } from 'src/app/services/shared/upload.service';
import { WharehouseService } from 'src/app/services/wharehouse.service';
import { WharehouseFormService } from '../wharehouse.form.service';

@Component({
  selector: 'app-whare-house-form',
  templateUrl: './whare-house-form.component.html',
  styleUrls: ['./whare-house-form.component.css']
})
export class WhareHouseFormComponent implements OnInit {
  materials: any[]=[];
  materials2: any[]=[];
  form: FormGroup;
  entrance:any='entrada';
  total:number=0;

  wharehouseMov:any= {
    'id':'',
    'fecha':'01/01/21',
    'code':'7501419310047',
    'product': 'Tortilla de Nopal y Linaza',
    'observations': '',
    'entrance':'100',
    'issues': '',
    'unitCost': '4.25',
    'totalCost':'425',
  };

  constructor(
              public _form: FormInvoiceService,
              public productService: ProductService,
              public wharehouseService: WharehouseService,
              public formBuilder: FormBuilder,
              public whareForm: WharehouseFormService,
    ) { }

  ngOnInit(): void {

    this.wharehouseService.refreshWhareHouse$.subscribe(res => {

    })

  this.form = this.formBuilder.group({
    id: [""],

    code: ["", Validators.required],
    fecha: ["", [Validators.required]],
    product: ["", Validators.required],
    observations: [""],
    entrance: ["",Validators.required],
    issues: ["", Validators.required],
    unitCost: ["",Validators.required],
    totalCost: [""],
  });


    // this.store.dispatch(InvoiceActions.addInvoice({url:this.url}));
    // this.productService.getRawMaterialByQuery('').subscribe(res => {
    //    this.materials = res;
    // });

    // this.productService.getProducts().subscribe(res => {

    //     this.materials2 = res;
    //     console.log('MATERIALS ', this.materials2);
    //     this.getPush();
    //   });

    this.whareForm.getData();

      console.log('ENTRANCE ', this.entrance);

  }


  addCustomer(){
    console.log('ADD CUSTOMER ');
  }

  ngOnDestroy() {
    console.log('Items destroyed');
    this._form.cleanForm();
  }

  getPush(){
    console.log('LENGHT ', this.materials2.length);
    for(let i = 0; i < this.materials2.length; i++){
      this.materials.push(this.materials2[i]);
    }
    console.log('COONTENT  ', this.materials);


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

  isEntrance(event: any){
    console.log('ENVRANCE VALUE ', this.entrance);
    console.log('ENVRANCE VALUE ', event.target.value);

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
    console.log('ENVRANCE VALUE ', this.form.get('unitCost').value);
   this.total =  this.form.get('unitCost').value * this.form.get('entrance').value;
   console.log('TOTAL ', this.total);

   if(this.entrance = 'value1'){
 console.log('ENTRANCE ');

}else {
  console.log('SALIDA ');

   }

   console.log('FORM ', this.form);

  }

  onCancel(){
    this.form.reset();
    this.total = 0;
  }

  onSubmit(){

    console.log('FORM ' , this.form.value);
    this.form.get('totalCost').setValue(this.total);
    let custom = JSON.stringify(this.form.value);
   this.wharehouseService.addWhareHouseMov(this.form.value).subscribe(res => {
      console.log('resupesta ', res.message);

   })

  }
}
