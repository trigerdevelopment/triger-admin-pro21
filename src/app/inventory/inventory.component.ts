import { Component, OnInit } from '@angular/core';
declare function init_plugins(): void;


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();

  }

}
