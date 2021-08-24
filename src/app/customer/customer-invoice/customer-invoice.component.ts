import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GraphState } from '../store/reducers/graph.reducer';
import * as GraphActions from '../store/actions/graph.actions';
@Component({
  selector: 'app-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.css']
})
export class CustomerInvoiceComponent implements OnInit {

  constructor(private store: Store<GraphState>) { }

  ngOnInit(): void {
    this.store.dispatch(GraphActions.loadGraphics())
  }

}
