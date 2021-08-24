import { Component, OnInit } from '@angular/core';
declare function init_plugins(): void;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();

  }

}
