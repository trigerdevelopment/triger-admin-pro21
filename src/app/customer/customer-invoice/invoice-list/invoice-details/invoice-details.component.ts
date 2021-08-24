import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InvoiceState } from 'src/app/customer/store/reducers/invoice.reducer';
import { Invoice } from 'src/app/models/customer';
import { InvoiceService } from 'src/app/services/invoice.service';

import * as InvoiceSelector from '../../../store/selectors/invoice.selectors';
import * as InvoiceActions from '../../../store/actions/invoice.actions';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SpinnerService } from 'src/app/services/spiner.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  id: string;
  invoice:any;

  constructor(private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private store: Store<InvoiceState>,
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
