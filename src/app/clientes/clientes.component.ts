import { Component, OnInit } from '@angular/core';
declare function init_plugins(): void;


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();

  }

}
