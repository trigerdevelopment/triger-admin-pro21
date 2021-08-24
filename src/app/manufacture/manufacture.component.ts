import { Component, OnInit } from '@angular/core';
declare function init_plugins(): void;

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
