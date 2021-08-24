import { AfterViewInit, Component, Input, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';
import { QueryService } from '../../query.service';
import { InvoiceState } from '../../store/reducers/invoice.reducer';
import * as InvoiceActions from '../../store/actions/invoice.actions';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit,AfterViewInit  {

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

  constructor(private store: Store<InvoiceState>,
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
    this.store.dispatch(InvoiceActions.loadInvoices({query:query}));

  }

  cleanButtonsClass(){
    for(let i = 0; i< this.totalPages; i++){
      document.querySelector(`#current${i}`).className = 'paginate_button'
   }
  }

}
