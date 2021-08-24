import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CustomerService } from "src/app/services/customer.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { SupplierService } from "src/app/services/supplier.service";

@Injectable({
  providedIn: "root",
})
export class AddCustomerFormService {
  custom: any = {
    id: "",
    company: "",
    storeNum: "",
    balance: "",
    rfc: "",
    status: false,
    monthSales: "",
    creditDays:"",
    categoria: "",
    customerAddress: {
      id: "",
      street: "",
      number: "",
      code: "",
      phone: "",
      email: "",
      city: "",
      state: "",
      country: "",
      suburb: "",
      notes: "",
    },
  };

  customer: any;
  constructor(
    public formBuilder: FormBuilder,
    public customerService: CustomerService,
    public supplierService: SupplierService,
    public alertService: ToastrService,
    private router: Router
  ) {}

  formCustomer: FormGroup = this.formBuilder.group({
    id: [""],
    company: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    storeNum: ["", Validators.required],
    balance: [""],
    rfc: [
      "",
      [Validators.required, Validators.minLength(12), Validators.maxLength(12)],
    ],
    status: [""],
    monthSales: [""],
    creditDays: [""],
    // productName: [''],
    categoria: ["", Validators.required],
    customerAddress: this.formBuilder.group({
      id: [""],
      street: ["", Validators.required],
      number: ["", Validators.required],
      code: ["", Validators.required],
      phone: [""],
      email: [""],
      city: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      suburb: ["", Validators.required],
      notes: [""],
    }),
  });

  cleanForm() {
     this.formCustomer.reset();
  }

  filledForm(value) {
    this.custom = value;
    if (this.custom.customerAddress !== null) {
      this.formCustomer.setValue(this.custom);
    } else {
      this.formCustomer.get("id").setValue(this.custom.id);
      this.formCustomer.get("company").setValue(this.custom.company);
      this.formCustomer.get("storeNum").setValue(this.custom.storeNum);
      this.formCustomer.get("rfc").setValue(this.custom.rfc);
      this.formCustomer.get("categoria").setValue(this.custom.categoria);
      this.formCustomer.get("status").setValue(this.custom.status);
    }
  }

  submit() {
    console.log("FORM ", this.formCustomer);
    let custom = JSON.stringify(this.formCustomer.value);

    this.customerService.createCustomer(custom).subscribe((res) => {
      this.alertService.info("El Cliente se dio de alta con exito");
    });
    this.cleanForm();
  }
  submitSuplier() {
    console.log("FORM ", this.formCustomer);
    let custom = JSON.stringify(this.formCustomer.value);

    this.supplierService.createSupplier(custom).subscribe((res) => {
      this.alertService.info("El Cliente se dio de alta con exito");
    });
    this.cleanForm();
  }

  edit() {
    this.customerService
      .updateCustomer(this.formCustomer.value)
      .subscribe((res) => {
        this.alertService.info("El Cliente se actualizo con exito");
      });
    this.cleanForm();
    // this.router.navigate(["customer/list"]);
  }

  editSupplier() {
    this.supplierService
      .updateSupplier(this.formCustomer.value)
      .subscribe((res) => {
        this.alertService.info("El Cliente se actualizo con exito");
      });
    this.cleanForm();
    // this.router.navigate(["customer/list"]);
  }
}
