import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { SpinnerService } from 'src/app/services/spiner.service';

@Component({
  selector: 'app-supplier-invoice-details',
  templateUrl: './supplier-invoice-details.component.html',
  styleUrls: ['./supplier-invoice-details.component.css']
})
export class SupplierInvoiceDetailsComponent implements OnInit {
  id: string;
  invoice:any;

  constructor(private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private spinnerService: SpinnerService,
    ) {}


  ngOnInit(): void {

    this.spinnerService.show();
    this.id = this.route.snapshot.paramMap.get('id');
    this.invoiceService.getInvoiceById(this.id).subscribe(res => {
      console.log('RESULTADO DE INVOICE BY ID', res);
      console.log('YA LLEGO!!!');
      this.spinnerService.hide();
      this.invoice = res;
    })

  }
}
