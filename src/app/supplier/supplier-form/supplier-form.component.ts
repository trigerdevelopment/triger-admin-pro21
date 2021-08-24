import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AddCustomerFormService } from 'src/app/customer/add-customer/add-customer-form.service';
import { ModalTypeComponent } from 'src/app/modals/modal-type/modal-type.component';
import { CategoryService } from 'src/app/services/category.service';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { SpinnerService } from 'src/app/services/spiner.service';
import { SupplierService } from 'src/app/services/supplier.service';

import * as SupplierSelectors from '../store/selectors/supplier.selector';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {

  id: any;
  supplier: any;
  edit: boolean = false;
  valid:boolean = false;
  customerType: any[];
  vm$: Observable<SupplierSelectors.SupplierSupportId>;

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private categoryService: CategoryService,
    public form: AddCustomerFormService,
    public ngxModalService: NgxModalService,
    private spinnerService: SpinnerService,
  ) {


  }

  ngOnDestroy() {
    this.form.cleanForm();

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });

    if(this.id){
      this.supplierService.getSupplierById(this.id).subscribe(res => {
        this.edit= true;

        this.form.filledForm(res);
      });

    }

    this.categoryService.refreshNeeded$.subscribe(() => {
      this.spinnerService.hide();
      this.getTypes();

    })


      this.getTypes();

  }

  getTypes(){

    this.categoryService.getCategories().subscribe(res => {
      this.customerType=res;
    })
  }


  mostrarTypeModal(){
    this.ngxModalService.show(ModalTypeComponent);

  }



}
