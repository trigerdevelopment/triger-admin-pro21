import { Component, OnInit } from '@angular/core';
declare function init_plugins(): void;


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();

  }

}
