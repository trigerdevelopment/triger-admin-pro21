import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-by-customer',
  templateUrl: './sales-by-customer.component.html',
  styleUrls: ['./sales-by-customer.component.css']
})
export class SalesByCustomerComponent implements OnInit {

months: any = ["enero","febrero"]

  customers =[ {
    'name': "Customer1",
    'storeNum': "1",
    sales: {
      'enero':2000,
      'febrero':3000

    }
  },
    {
    'name': "Customer2",
    'storeNum': "1",
    sales: {
      'mes':'enero',
      'enero':2000,
      'febrero':3000

    }
  },
  {
    'name': "Customer3",
    'storeNum': "1",
    sales: {
      'mes':'enero',
      'enero':52000,
      'febrero':35000

    }
  }

]

  constructor() { }

  ngOnInit(): void {
  }

}
