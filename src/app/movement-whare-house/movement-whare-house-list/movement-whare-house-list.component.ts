import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { WharehouseService } from 'src/app/services/wharehouse.service';
import { WhareHouseState } from '../store/reducers/whare-house.reducer';
import * as wharehouseSelector from '../store/selectors/whare-house.selector';
import { WhareHouseModalComponent } from '../whare-house-modal/whare-house-modal.component';
import * as whareHouseActions from '../store/actions/whare-house.actions';
import { WharehouseFormService } from '../wharehouse.form.service';

@Component({
  selector: 'app-movement-whare-house-list',
  templateUrl: './movement-whare-house-list.component.html',
  styleUrls: ['./movement-whare-house-list.component.css']
})
export class MovementWhareHouseListComponent implements OnInit {

  url:any = '';
  orderBy:any = '';
  sortBy: any='';
  basecontroller:any='';
  movement:any[]=[];
  vm$: Observable<wharehouseSelector.PaginatorSupport>;


  constructor(
    private store: Store<WhareHouseState>,
    public ngxModalService: NgxModalService,
    public whareForm: WharehouseFormService,
    public wharehouseService: WharehouseService,

  ) { }

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(wharehouseSelector.selectInvoiceSupportModel));
    this.wharehouseService.refreshWhareHouse$.subscribe(() => {
      this.store.dispatch(whareHouseActions.loadWhareHouseMov({ query:'' }));
  });
  }



  mostrarMultipleModal(){}

  showFormModal(){
    this.ngxModalService.show(WhareHouseModalComponent);

  }

  edit(obj: any){
    this.ngxModalService.show(WhareHouseModalComponent);
    this.whareForm.edit(obj);

  }

  functionSortBy(data:any):any {}

  invoiceDetail(data:any){}

  deleteInvoice(data:any){}
}
