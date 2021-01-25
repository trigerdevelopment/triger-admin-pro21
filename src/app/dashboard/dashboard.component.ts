import { Component, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { Observable } from 'rxjs';
// declare function init_plugins(): void;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // jwt$: Observable<string>
  constructor(
    // private store: Store<AuthState>
    ) { }

  ngOnInit(): void {
    // init_plugins();
    // this.jwt$ = this.store.pipe(select(selectJwt));
  }

}
