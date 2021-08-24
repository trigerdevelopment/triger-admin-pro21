import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QueryService } from '../../query.service';
import { CustomerState } from '../../store/reducers/customer.reducers';
import * as CustomerActions from '../../store/actions/customer.actions';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-list-paginator',
  templateUrl: './customer-list-paginator.component.html',
  styleUrls: ['./customer-list-paginator.component.css']
})
export class CustomerListPaginatorComponent implements OnInit {

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

  constructor(private store: Store<CustomerState>,
              private queryService: QueryService,
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
    this.store.dispatch(CustomerActions.loadCustomerByQuery({query:query}));

  }

  cleanButtonsClass(){
    for(let i = 0; i< this.totalPages; i++){
      document.querySelector(`#current${i}`).className = 'paginate_button'
   }
  }


}
