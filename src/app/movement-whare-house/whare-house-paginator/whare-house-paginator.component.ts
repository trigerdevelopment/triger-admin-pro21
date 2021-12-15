import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QueryService } from 'src/app/customer/query.service';
import { WhareHouseState } from '../store/reducers/whare-house.reducer';
import * as wharehouseActions from '../store/actions/whare-house.actions';
import { query } from '@angular/animations';

@Component({
  selector: 'app-whare-house-paginator',
  templateUrl: './whare-house-paginator.component.html',
  styleUrls: ['./whare-house-paginator.component.css']
})
export class WhareHousePaginatorComponent implements OnInit {


  @Input() totalPages: number;
  @Input() first: boolean;
  @Input() number:number;
  @Input() last:boolean;
  @Input() orderBy:boolean;
  @Input() sortBy:string;
  @Input() url:string;
  query:string;
  current: number = 0;
  baseurl:string;

  constructor(
              private store: Store<WhareHouseState>,
              private queryService: QueryService
            ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    document.querySelector('#current0').className='paginate_button current'
  }


  setPageNo(event:any, index:any){

    this.cleanButtonsClass();
    event.target.className = 'paginate_button current';
    this.dispatchActions(index);

  }

  restPage(){
     this.dispatchActions(this.number-1);
     this.cleanButtonsClass();
     document.querySelector(`#current${this.number-1}`).className = 'paginate_button current'
    }

  addPage(){
    this.dispatchActions(this.number+1);
    this.cleanButtonsClass();
    document.querySelector(`#current${this.number+1}`).className = 'paginate_button current'
  }

  dispatchActions(pageNo:any){

    const url = this.queryService.queryData;
    const query = this.queryService.addPageToQuery(pageNo,url)
    // this.store.dispatch(InvoiceActions.loadInvoices({query:query}));
    this.store.dispatch(wharehouseActions.loadWhareHouseMov({query:query}));

  }

  cleanButtonsClass(){
    for(let i = 0; i< this.totalPages; i++){
      document.querySelector(`#current${i}`).className = 'paginate_button'
   }
  }


}
