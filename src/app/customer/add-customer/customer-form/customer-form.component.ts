import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "src/app/models/customer";
import { AddCustomerFormService } from "../add-customer-form.service";
import * as CustomerSelector from '../../store/selectors/customer.selectors';
import { Observable } from "rxjs";
import { NgxModalService } from "src/app/services/shared/ngx-modal.service";
import { ModalTypeComponent } from "src/app/modals/modal-type/modal-type.component";
import { SpinnerService } from "src/app/services/spiner.service";
import { CustomerService } from "src/app/services/customer.service";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.css"],
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  id: any;
  customer: Customer;
  edit: boolean = false;
  valid:boolean = false;
  customerType: any[];
  vm$: Observable<CustomerSelector.CustomerSupportId>;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private categoryService: CategoryService,
    public form: AddCustomerFormService,
    private ngxModalService: NgxModalService,
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
      this.customerService.getCustomerById(this.id).subscribe(res => {
        this.edit = true;
        this.form.filledForm(res);
      })

    }


    this.categoryService.refreshNeeded$.subscribe(() => {
      this.spinnerService.hide();
      this.getTypes();

    })

    this.getTypes();
  }

  mostrarTypeModal(){
    this.ngxModalService.show(ModalTypeComponent);

  }

  getTypes(){

    this.categoryService.getCategories().subscribe(res => {
      this.customerType=res;
    })
  }

}
