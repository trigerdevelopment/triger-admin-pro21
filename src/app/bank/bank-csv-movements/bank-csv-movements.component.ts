import { Component, OnInit } from '@angular/core';
import { Pageable } from 'src/app/models/customer';
import { GetService } from 'src/app/services/get-service/get-service.service';
import { ModalService } from 'src/app/services/shared/modal.service';
import { UploadService } from 'src/app/services/shared/upload.service';

@Component({
  selector: 'app-bank-csv-movements',
  templateUrl: './bank-csv-movements.component.html',
  styleUrls: ['./bank-csv-movements.component.css']
})
export class BankCsvMovementsComponent implements OnInit {
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
  pageable:Pageable;
  pageNumber: number=0;

  idModal: string = "customer";
  URL_CUSTOMER: string = "cfdi/customer-xml-file";

  // urlinvoice: string = "/invoice/get-supplier-invoice";
  // urlinvoiceCount: string = "/supplier/get-count-supplier-invoice";
  urlinvoiceQuery: string = "/invoice/invoice-by-query";
  urlSalesByMonth: string = "/report/get-sales-by-month";
  urlSalesByDate: string = "/report/get-sales-by-date";
  urlSalsByCurrDte: string="/report/get-sales-current-date";
  urlInvoiceCurrentDate: string="/invoice/invoice-current-date"


  invoices: any[] = [];
  // invoices2: Pageable;

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

  constructor(
    public _modalService: ModalService,
    public _uploadService: UploadService,
    public _getinvoice: GetService,
  ) {

   }



  ngOnInit(): void {
    this._uploadService.refreshForInvoice.subscribe(() => {

      this._modalService.cerrarModalProveedor();
      console.log('UPLOAD SERVICE REFRECHHHH');

      this.getFacturasPorPagina(this.pageSize, 0);
    });

    console.log('FUERA DEL REFRESSSSHHHH');

       this.getFacturasPorPagina(this.pageSize, 0);
  }

  mostrarModal() {
    this._modalService.mostrarModalUpload(this.idModal, this.URL_CUSTOMER);
  }

  mostrarMultipleModal(){
    this._modalService.mostrarMultipleFileUploadModal(this.idModal, this.URL_CUSTOMER);

  }

  mostrarPaymentModal(){
    this._modalService.mostrarPaymentModal(this.idModal, this.URL_CUSTOMER);
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
      this.onSubmiter();
    }
  }

  restPageNo() {
    if (this.pageNo > 0) {
      this.pageNo = this.pageNo - 1;
      this.onSubmiter();
    }
  }

  setEventPageSize(event: any) {
    console.log('EVENT ', event.target.value);
    this.pageSize = event.target.value;

    if(this.isFilter){

      this.pageNo=0;
      if(this.iniDate !=="" && this.finalDate !=="" || this.iniFolio || this.finalFolio || this.total2 || this.total || this.company || this.sucursal){

        this.onSubmiter();
      }else{
        console.log('SELECCINA UN RANGO DE FECHAS');

      }
    }else{
      this.onSubmiter();
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
    this.onSubmiter();
  }


  /* ------------Se piden las Facturas por Pagina, si es por primera vez inicia desde la pagian cero-------- */

  getFacturasPorPagina(pageSize: any, pageNo: any) {
    this.pageNo = pageNo;
    this.onSubmiter();
  }

  addFilter() {
    this.pageNo = 0;
    this.isFilter=true;
    if(this.iniDate !=="" && this.finalDate !=="" || this.iniFolio || this.finalFolio || this.total2 || this.total || this.company || this.sucursal){

      this.onSubmiter();
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

    this.onSubmiter();
  }

  onSubmiter() {
    if(!this.isFilter){
      this.invoices = [];
      this.isLoading=true;
      this.pagesLenght = Array(0);
      // const stringQuery = `iniDate=${this.iniDate}&finalDate=${this.finalDate}&serie=${this.serie}&iniFolio=${this.iniFolio}&finalFolio=${this.finalFolio}&company=${this.company}&sucursal=${this.sucursal}&total=${this.total}&total2=${this.total2}`;

      this._getinvoice
        .getInvoiceByCurrentDate(
          this.urlInvoiceCurrentDate,
          this.pageSize,
          this.pageNo,
          this.orderBy,
          this.sortBy
        )
        .subscribe((res) => {

          this.invoices = res.content;
           this.totalPages = res.totalPages;
          // this.pagesLenght = Array(res.totalPages);
          this.pagesLenght = res.totalPages;
          this.pageNumber = res.number+1;
          this.isLastPage = res.last;
          this.numberOfElements = res.numberOfElements;
          this.totalElements = res.totalElements;
          this.pageable = res;
          console.log('RES SIN FILTRO ', res);
          console.log('RES SIN FILTRO ', this.pageable.totalPages);
          this.getSalesByCurrentDate();
          this.isLoading=false;

        });

    }else{
      this.onFilterSubmitter();
    }

  }

  /*----------------------- Se piden datos al servidor para llenar la grafica---------------------- */



  funcTotalSales(){

    // for (let index = 0; index < this.invoices.length; index++) {

    //   this.totalSales = this.totalSales + this.invoices[index].total;

    // }

  }

  onFilterSubmitter(){
    this.invoices = [];
    this.isLoading=true;
    this.pagesLenght = Array(0);
    const stringQuery = `iniDate=${this.iniDate}&finalDate=${this.finalDate}&serie=${this.serie}&iniFolio=${this.iniFolio}&finalFolio=${this.finalFolio}&company=${this.company}&sucursal=${this.sucursal}&total=${this.total}&total2=${this.total2}`;

    this._getinvoice
      .getInvoiceByQuery(
        this.urlinvoiceQuery,
        stringQuery,
        this.pageSize,
        this.pageNo,
        this.orderBy,
        this.sortBy
      )
      .subscribe((res) => {

        this.invoices = res.content;
           this.totalPages = res.totalPages;
          // this.pagesLenght = Array(res.totalPages);
          this.pagesLenght = res.totalPages;
          this.pageNumber = res.number+1;
          this.isLastPage = res.last;
          this.numberOfElements = res.numberOfElements;
          this.totalElements = res.totalElements;
          this.pageable = res;
          console.log('RES FILTRO ', res);
          console.log('RES FILTRO ', this.pageable.totalPages);
        this.getSalesByDate();
          this.isLoading=false;

      });

  }

  getSalesByDate(){
    const stringQuery = `iniDate=${this.iniDate}&finalDate=${this.finalDate}`;
    this._getinvoice.getSalesByDate(this.urlSalesByDate,stringQuery).subscribe(res=> {
      this.totalSales = res;
    })
  }

  getSalesByCurrentDate(){
    const stringQuery = `iniDate=${this.iniDate}&finalDate=${this.finalDate}`;
    this._getinvoice.getSalesByCurrentDate(this.urlSalsByCurrDte).subscribe(res=> {
      this.totalSales = res;
    })
  }


}
