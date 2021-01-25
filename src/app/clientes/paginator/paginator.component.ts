import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { Filter } from 'src/app/models/customer';
import { filterBy } from '../store/actions/facturas.actions';
import * as facturasSelector from '../store/selectors/facturas.selectors';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() pageNo: number = 0;
  @Input() numberOfElements: number;
  @Input() totalPages: number = 1;
  @Input() size: number = 10;
  @Input() first: boolean = false;
  @Input() last: boolean = false;
  filter: Filter;

  isLastPage: boolean = true;
  filter$: Observable<any>;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.filter$ = this.store.pipe(
      select(facturasSelector.selectName)
    );
    this.filter$.subscribe(res => {
      // console.log('SELECTOR SUSCRIBE ', res);
      this.filter = res

    });
  }

  addPageNo() {

    let pageNumber: number = this.filter.pageNo;
    pageNumber = pageNumber + 1;
    console.log('PAGE NUMBER ', pageNumber);

    console.log('FILTER ', this.filter.pageNo = pageNumber);
    console.log('FILTER ADD  ', this.filter);

    this.store.dispatch(filterBy({ filter: this.filter }));


  }

  restPageNo() {

    let pageNumber: number = this.filter.pageNo;
    pageNumber = pageNumber - 1;
    this.filter.pageNo = pageNumber;
    this.store.dispatch(filterBy({ filter: this.filter }));

  }

  lastPage() {
    let pageNumber: number = this.totalPages - 1;
    this.filter.pageNo = pageNumber;
    this.store.dispatch(filterBy({ filter: this.filter }));
  }

  firstPage() {
    this.filter.pageNo = 0;
    this.store.dispatch(filterBy({ filter: this.filter }));
  }

}
