import { Component, OnInit } from '@angular/core';
declare function init_plugins(): void;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();

  }

}
