import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import * as InvoiceSelector from '../../store/selectors/invoice.selectors';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  id:any;
  customer:any;
  vm$: Observable<InvoiceSelector.PaginatorSupport>;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
    ) { }

  ngOnInit(): void {

   this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

   });

   this.customerService.getCustomerById(this.id).subscribe(res => {
   this.customer = res;
  })
  }

  editar(){
    this.router.navigate(['customer/customer-edit', this.id]);

  }

}
