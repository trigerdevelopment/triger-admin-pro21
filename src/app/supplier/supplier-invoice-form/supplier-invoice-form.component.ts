import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-supplier-invoice-form',
  templateUrl: './supplier-invoice-form.component.html',
  styleUrls: ['./supplier-invoice-form.component.css']
})
export class SupplierInvoiceFormComponent implements OnInit {

  errors: any
  url: string = '/customer/get-all-customer';
  products: any[] = [];
  suppliers: any[] = [];
  form: FormGroup;
  totalCosto: number = 0;
  resultado: any;

  constructor
    (
      private invoiceService: InvoiceService,
      public formBuilder: FormBuilder,
      private productService: ProductService,
      private supplierService: SupplierService,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [""],
      supplier: this.formBuilder.group({
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

    this.productService.getRawMaterialByQuery('').subscribe(res => {
      this.products = res;
    })

    this.supplierService.getAllSupplierByQuery('').subscribe(res => {
      this.suppliers = res.content;
    })

    this.addMaterials();
  }

  removeMaterials(id: number) {
    this.materials.removeAt(id);
    this.itemsCalculation();
  }

  createRawMaterials(): FormGroup {
    return this.formBuilder.group({
      id: [""],
      claveProdServ: [""],
      cantidad: ["", Validators.required],
      date: [""],
      unidad: [""],
      claveUnidad: ["", Validators.required],
      descripcion: [""],
      valorUnitario: [""],
      importe: ["", Validators.required],
      descuento: [""],
    });
  }

  selectedItem(event, id) {

    console.log('EVENT ', event.target.value);



    this.products[event.target.selectedIndex].code
    this.resultado = this.products[event.target.selectedIndex-1];
    console.log('RESULTADO ', this.resultado);


    var arrayControl = this.form.get("invoiceItems") as FormArray;

    if (arrayControl.controls[id].value.cantidad > 0) {
      arrayControl.controls[id]
        .get("claveUnidad")
        .setValue(this.resultado.code);

      arrayControl.controls[id].get("unidad").setValue("pza");
      arrayControl.controls[id]
        .get("valorUnitario")
        .setValue(this.resultado.unitCost);
      arrayControl.controls[id]
        .get("importe")
        .setValue(
          arrayControl.controls[id].value.cantidad *
          arrayControl.controls[id].value.valorUnitario
        );
      arrayControl.controls[id].get("cantidad")

    } else {
      arrayControl.controls[id].get("invoiceItems").setValue("");
    }

    this.itemsCalculation();

    console.log('FORM ', this.form);

  }

  get materials(): FormArray {
    return this.form.get("invoiceItems") as FormArray;
  }

  addMaterials() {
    this.materials.push(this.createRawMaterials());
  }

  ngOnDestroy() {
    this.cleanForm();
  }

  selectedCustomer(event) {
    this.form.get("supplier.id").setValue(event.target.value);
  }


  itemsCalculation() {

    var arrayControl = this.form.get("invoiceItems") as FormArray;
    this.totalCosto = 0;
    for (var i = 0; i < arrayControl.length; i++) {
      this.totalCosto =
        this.totalCosto + arrayControl.controls[i].value.importe;
    }
    this.form.get("total").setValue(this.totalCosto);
  }

  recalculateCost() {
    var arrayControl = this.form.get("invoiceItems") as FormArray;
    if (arrayControl.length > 0) {
      this.itemsCalculation();
    }
  }

  inputChange(event: any, id) {
    var arrayControl = this.form.get("invoiceItems") as FormArray;
    arrayControl.controls[id]
      .get("importe")
      .setValue(
        arrayControl.controls[id].value.cantidad *
        arrayControl.controls[id].value.valorUnitario
      );
    this.itemsCalculation();
  }

  submit() {

    this.addDateToItems();
    let myDate = this.getDate(this.form.get("fecha").value);
    this.form.get("fecha").setValue(myDate);
    let myDate2 = this.getDate(this.form.get("fechaPago").value);
    this.form.get("fechaPago").setValue(myDate2);
    let resource = JSON.stringify(this.form.value);
    console.log('INVOICE ', resource);

    this.invoiceService.addSuppilerInvoice(resource).subscribe((res) => {
      console.log("production ", res);
      this.cleanForm();
      Swal.fire({
        icon: "success",
        text: "Los datos se han enviado con exito",
        title: "Envio al Servidor",
      });
    });

  }

  addDateToItems() {
    var arrayControl = this.form.get("invoiceItems") as FormArray;
    for (var i = 0; i < arrayControl.length; i++) {
      arrayControl.controls[i]
        .get("date")
        .setValue(this.form.get("fecha").value);
    }
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

  getDate(date) {
    var parts = date.split("-");
    console.log("PARTS ", parts);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

}
