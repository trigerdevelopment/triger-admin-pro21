export class Customer {
  public id: number;
  public company: string;
  public customerRfc: string;
  public storeNum: string;
  public balance: number;
  public budget: number;
  public status: boolean;
  public subAccount: string;
}

export class Clientes {
  public customerName: string;
  public sucursal: string;
  public january: number;
  public february: number;
  public march: number;
  public april: number;
  public may: number;
  public june: number;
  public july: number;
  public august: number;
  public september: number;
  public october: number;
  public november: number;
  public december: number;
}

export class Invoice {

  public id: number;
  public company;
  public storeNum;
  public sucursal: string;
  public fecha: Date;
  public fechaPago: Date;
  public condicionesDePago: string;
  public  subTotal: number;
  public  total: number;
  public  pago: number;
  public payment: boolean;
  public folio: string;
  public impuesto:number;
  public customer: Customer;
  public invoiceItems: InvoiceItems;


  }

  export class InvoiceItems {
    public cantidad: number;
    public descripcion: string;
    public valorUnitario: number;
    public importe: number;
}


export class Pageable {
  public content: Invoice[];
  public totalElements: number;
  public totalPages: number=1;
  public number:number;
  public first: boolean;
  public last: boolean;
  public size:number;
  public numberOfElements: number;
  public pageNo: number
}


export class Filter {
  public iniDate: string;
  public finalDate: string;
  public serie: string;
  public iniFolio: string;
  public finalFolio: string;
  public company: string;
  public sucursal: string;
  public total: string;
  public total2: string;
  public pageNo: number;
  public pageSize: string;
  public sortBy: string;
  public orderBy: boolean;

}

export class SalesReportFilter {
  public iniDate: string;
  public finalDate: string;
  public company: string;
  public sucursal: string;

}

