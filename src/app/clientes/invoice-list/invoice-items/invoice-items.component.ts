import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Page } from 'ngx-pagination/dist/pagination-controls.directive';
import { Invoice, Pageable } from 'src/app/models/customer';
import { ModalService } from 'src/app/services/shared/modal.service';
import { MultipleFileUploadModalComponent } from '../../multiple-file-upload-modal/multiple-file-upload-modal.component';

@Component({
  selector: 'app-invoice-items',
  templateUrl: './invoice-items.component.html',
  styleUrls: ['./invoice-items.component.css']
})
export class InvoiceItemsComponent implements OnInit {
  invoices: Invoice[];
  iniDate: String = "";
  finalDate: String = "";
  serie: string = "";
  iniFolio: string = "";
  finalFolio: string = "";
  company: string = "";
  sucursal: string = "";
  total: string = "";
  total2: string = "";
  totalPages: number = 1;
  isLastPage: boolean = false;
  isFilter: boolean = false;
  isLoading:boolean=false;
  // pageable:Pageable;
  pageNumber: number=0;
  pageSize: any = "10";
  pageNo: any = "0";
  currentPage: any = "0";
  numberOfElements: any = "0";
  totalElements:number=0;
  showing: any = "10";
  buttonToShow: any = "1";
  isAsc: boolean = true;
  orderBy: boolean = false;
  sortBy:string ="fecha";
  pagesLenght: any = "0";
  totalSales: number = 0;
  pages = [
    {id: 10, name: "10"},
    {id: 25, name: "25"},
    {id: 50, name: "50"},
    {id: 100, name: "100"},
  ];
  selectedValue:any ="25";
  idModal: string = "customer";
  URL_CUSTOMER: string = "cfdi/customer-xml-file";
@Input() invoice: Invoice;
@Input() pageable: Pageable;
chkCompleted: FormControl;

modalRef: BsModalRef;


  constructor(private _modalService: ModalService) {
    console.log('INVOICES ', this.invoice);

  }

  ngOnInit(): void {
    console.log('INVOICES ', this.invoice);
    this.chkCompleted = new FormControl();
    this.chkCompleted.valueChanges.subscribe(valor=> {
      console.log('valor ', valor);
      console.log('valor ', this.chkCompleted.value)})
    }



  checked() {
    this.chkCompleted.setValue(true);
  }

  mostrarMultipleModal(){
console.log('mostrar modal');

    this._modalService.mostrarMultipleFileUploadModal(this.idModal, this.URL_CUSTOMER);

  }

  mostrarPaymentModal(){
    // this._modalService.mostrarPaymentModal(this.idModal, this.URL_CUSTOMER);
  }

  querySearch(search: string) { }

  filter() {
    this.isFilter = !this.isFilter;

    if (!this.isFilter) {
      this.iniDate = "";
      this.finalDate = "";
      this.serie = "";
      this.iniFolio = "";
      this.finalFolio = "";
      this.company = "";
      this.sucursal = "";
      this.total = "";
      this.total2 = "";
    }
  }

  addPageNo() {
    if (!this.isLastPage) {
      this.pageNo = this.pageNo + 1;
      // this.onSubmiter();
    }
  }

  restPageNo() {
    if (this.pageNo > 0) {
      this.pageNo = this.pageNo - 1;
      // this.onSubmiter();
    }
  }

  setEventPageSize(event: any) {

    this.pageSize = event.target.value;

    if(this.isFilter){

      this.pageNo=0;
      if(this.iniDate !=="" && this.finalDate !=="" || this.iniFolio || this.finalFolio || this.total2 || this.total || this.company || this.sucursal){

        // this.onSubmiter();
      }else{
        // console.log('SELECCINA UN RANGO DE FECHAS');

      }
    }else{
      // this.onSubmiter();
    }
  }

  setPageSize() {
    this.getFacturasPorPagina(this.pageSize, this.pageNo);
  }

  functionOrderBy(event: any) {
    this.isAsc = !this.isAsc;
    this.orderBy = this.isAsc;
    this.sortBy = event;
    console.log('SORT BY', this.sortBy);

    this.pageNo=0;
    // this.onSubmiter();
  }


  /* ------------Se piden las Facturas por Pagina, si es por primera vez inicia desde la pagian cero-------- */

  getFacturasPorPagina(pageSize: any, pageNo: any) {
    this.pageNo = pageNo;
    // this.onSubmiter();
  }

  addFilter() {
    this.pageNo = 0;
    this.isFilter=true;
    if(this.iniDate !=="" && this.finalDate !=="" || this.iniFolio || this.finalFolio || this.total2 || this.total || this.company || this.sucursal){

      // this.onSubmiter();
    }else{
      console.log('SELECCINA UN RANGO DE FECHAS');

    }
  }

  quitarFiltro() {
    this.iniDate = "";
    this.finalDate = "";
    this.iniFolio = "";
    this.finalFolio = "";
    this.company = "";
    this.sucursal = "";
    this.total = "";
    this.total2 = "";
    this.pageNo = 0;
    this.isFilter=false;

    // this.onSubmiter();
  }

}
