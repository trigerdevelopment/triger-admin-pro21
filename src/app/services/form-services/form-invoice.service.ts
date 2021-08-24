import { EventEmitter, Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CustomerState } from "src/app/customer/store/reducers/customer.reducers";
import { InvoiceState } from "src/app/customer/store/reducers/invoice.reducer";
import * as CustomerActions from "../../customer/store/actions/customer.actions";
import * as ProductsSelector from "../../customer/store/selectors/product.selectors";
import Swal from "sweetalert2";
import { InvoiceService } from "../invoice.service";
import * as CustomerSelector from "../../customer/store/selectors/customer.selectors";

@Injectable({
  providedIn: "root",
})
export class FormInvoiceService {
  pm$: Observable<ProductsSelector.ProductSupport>;
  vm$: Observable<CustomerSelector.CustomerSupport>;

  resultado: any;
  public notificacion = new EventEmitter<any>();

  products: any[] = [];
  customers: any[] = [];
  totalCosto: number = 0;
  totalpzas: number = 0;

  production: {
    id: "";
    productName: "";
    code: "";
    batch: "";
    product: "";
    initialDate: "";
    finalDate: "";
    observation: "";
    quantity: "";
    cost: "";
    totalCost: "";
  };

  constructor(
    public formBuilder: FormBuilder,
    private store: Store<CustomerState>,
    private invoiceService: InvoiceService
  ) // private _productionservice: ProduccionService
  {
    // this.getAllProducts();
    // this.store
    //   .pipe(select(ProductsSelector.selectProductSupportModel))
    //   .subscribe((res) => {
    //     this.products = res.pageable.content;
    //     console.log("PRODUCTS ", this.products);
    //   });

    // this.store
    //   .pipe(select(CustomerSelector.selectCustomerSupportModel))
    //   .subscribe((res) => {
    //     this.customers = res.customers;
    //   });

    this.addMaterials();
    this.cleanForm();
  }

  createRawMaterials(): FormGroup {
    return this.formBuilder.group({
      id: [""],
      claveProdServ: [""],
      cantidad: ["",Validators.required],
      date: [""],
      unidad: [""],
      claveUnidad: ["", Validators.required],
      descripcion: [""],
      valorUnitario: [""],
      importe: ["", Validators.required],
      descuento: [""],
    });
  }

  form: FormGroup = this.formBuilder.group({
    id: [""],
    // productName: [''],
    customer: this.formBuilder.group({
      id: ["", Validators.required],
    }),
    condicionesDePago: ["", Validators.required],
    concept: [""],
    company: [""],
    fecha: ["", [Validators.required]],
    fechaPago: ["", Validators.required],
    sucursal: [""],
    subTotal: [""],
    impuesto: [""],
    descuento: [""],
    total: [""],
    pago: [""],
    folio: ["", Validators.required],
    invoiceItems: this.formBuilder.array([]),
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
    return this.form.get("invoiceItems") as FormArray;
  }

  addMaterials() {
    this.materials.push(this.createRawMaterials());
  }

  getAllProducts() {
    // this._productionservice.getAllProducts().subscribe(res => {
    //   this.products = res;
    //   console.log("PRODUCTS ", this.products);
    // });
  }

  itemsCalculation() {
    console.log("FORM ", this.form.controls.invoiceItems.value);
    var arrayControl = this.form.get("invoiceItems") as FormArray;

    this.totalCosto = 0;
    for (var i = 0; i < arrayControl.length; i++) {
      this.totalCosto =
        this.totalCosto + arrayControl.controls[i].value.importe;
    }
    this.form.get("total").setValue(this.totalCosto);
    // this.form.get("importe").setValue(this.totalCosto / this.totalpzas);
  }

  selectedCustomer(event) {
    // this.getAllProducts();
    console.log("SELECT EVENT ", event);
    console.log("SELECT CODE ", event.target.value);
    // this.store.dispatch(CustomerActions.loadCustomer());
    // const resultado = this.products.find( res => res.id === event.target.selectedIndex);
    // const resultado = this.customers[event.target.selectedIndex - 1];
    // console.log("RESULTADO CUSTOMERS ", resultado);
    this.form.get("customer.id").setValue(event.target.value);
    console.log('FORM ', this.form.value);

    // this.form.get('code').setValue(resultado.code);
    // this.form.get('product').setValue(resultado.productName);
  }

  selectedItem(event, data, id) {
    console.log("VALOR DE ID ", id);
    console.log("EVENT ", data);
    console.log("EVENT TARGET ", event.target);
    console.log("EVENT TARGET VALUE ", event.target.value);
    console.log(
      "EVENT SRCELEMENT SELECTED INDEX ",
      event.srcElement.selectedIndex
    );
    console.log("EVENT TARGET SELECTED INDEX ", event.target.selectedIndex);
    // var cant = 10;
    //  this.resultado = this.products.find( res => res[event.target.selectedIndex] === event.target.selectedIndex);
    console.log("RESULTADO ", this.products[event.target.selectedIndex]);
    console.log(
      "RESULTADO CODE",
      this.products[event.target.selectedIndex].code
    );
    this.resultado = this.products[event.target.selectedIndex];

    var arrayControl = this.form.get("invoiceItems") as FormArray;
    console.log("FORM CONTROL ", this.form.controls);
    console.log("FORM RAWMATERIAL", this.form.controls.invoiceItems.value[id]);
    // console.log('FORM QUANTITY', this.form.controls.rawMaterials.value[id].cantidad);

    console.log("FORM DATA ", data);
    console.log("QUANTITY ", arrayControl.controls[id].value.quantity);

    if (arrayControl.controls[id].value.cantidad > 0) {
      console.log("FORM ARRAY ", arrayControl.controls);
      console.log("CODE ", this.resultado);
      arrayControl.controls[id]
        .get("claveUnidad")
        .setValue(this.resultado.code);
      arrayControl.controls[id].get("unidad").setValue("pza");
      arrayControl.controls[id]
        .get("valorUnitario")
        .setValue(this.resultado.unitPrice);
      arrayControl.controls[id]
        .get("importe")
        .setValue(
          arrayControl.controls[id].value.cantidad *
            arrayControl.controls[id].value.valorUnitario
        );

      console.log(
        "FORM ARRAY SET VALUE ",
        arrayControl.controls[id].get("cantidad")
      );
    } else {
      //   this.snackbar.fail('Agregar la cantidad utilizada de materia prima ');
      arrayControl.controls[id].get("invoiceItems").setValue("");
    }

    //  this.raw[id] = <Raw>arrayControl.controls[id].value;
    //  this.raw[id].costo = data.unitCost;
    //  this.raw[id].total = this.raw[id].quantity * this.raw[id].costo;
    //  arrayControl.controls[id].setValue(this.raw[id]);

    this.itemsCalculation();
  }

  recalculateCost() {
    var arrayControl = this.form.get("invoiceItems") as FormArray;
    if (arrayControl.length > 0) {
      this.itemsCalculation();
    }
  }

  inputChange(event: any, id) {
    console.log("I ", id);
    var arrayControl = this.form.get("invoiceItems") as FormArray;
    arrayControl.controls[id]
      .get("importe")
      .setValue(
        arrayControl.controls[id].value.cantidad *
          arrayControl.controls[id].value.valorUnitario
      );
    this.itemsCalculation();
  }

  onSubmit() {
    console.log("FORM ", this.form);

    this.addDateToItems();
    let myDate = this.getDate(this.form.get("fecha").value);
    this.form.get("fecha").setValue(myDate);
    // this.form.get('initialDate').setValue(this.getDate(date.target.value));
    console.log("FORM ", this.form);

    let myDate2 = this.getDate(this.form.get("fechaPago").value);
    this.form.get("fechaPago").setValue(myDate2);
    // this.form.get('initialDate').setValue(this.getDate(date.target.value));
    console.log("FORM ", this.form);

    let resource = JSON.stringify(this.form.value);
    console.log("RESOURCE ", resource);

    this.invoiceService.addInvoice(resource).subscribe((res) => {
      console.log("production ", res);
      this.cleanForm();
      Swal.fire({
        icon: "success",
        text: "Los datos se han enviado con exito",
        title: "Envio al Servidor",
      });
      this.notificacion.emit(res);
    });
  }

  cleanForm() {
    this.form.get("fecha").setValue("");
    this.form.reset();
    //  console.log('ARRAY LENGHT', this.materials.length);
    var arrayControl = this.form.get("invoiceItems") as FormArray;
    for (var i = 0; i < arrayControl.length; i++) {
      arrayControl.controls[i].get("claveProdServ").setValue("");
      arrayControl.controls[i].get("claveUnidad").setValue("");
      arrayControl.controls[i].get("descripcion").setValue("");
      arrayControl.controls[i].get("unidad").setValue("pza");
      arrayControl.controls[i].get("valorUnitario").setValue("");
      arrayControl.controls[i].get("importe").setValue("");
      this.materials.removeAt(i + 1);
    }
  }

  formatInitialDate() {}

  formatFinalDate() {}

  getDate(date) {
    var parts = date.split("-");
    console.log("PARTS ", parts);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  addDateToItems() {
    var arrayControl = this.form.get("invoiceItems") as FormArray;
    for (var i = 0; i < arrayControl.length; i++) {
      arrayControl.controls[i]
        .get("date")
        .setValue(this.form.get("fecha").value);
    }
  }
}
