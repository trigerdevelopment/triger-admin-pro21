import { Component, OnInit } from '@angular/core';
declare function init_plugins(): void;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
