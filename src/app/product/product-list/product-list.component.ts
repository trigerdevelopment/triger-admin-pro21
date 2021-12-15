import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/customer/query.service';
import { InvoiceFormModalComponent } from 'src/app/modals/invoice-form-modal/invoice-form-modal.component';
import { ModalUploadComponent } from 'src/app/modals/modal-upload/modal-upload.component';
import { MultipleFileComponent } from 'src/app/modals/multiple-file/multiple-file.component';
import { ProductModalComponent } from 'src/app/modals/product-modal/product-modal.component';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { environment } from 'src/environments/environment';
import { loadProducts } from '../store/actions/product.actions';
import { ProductState } from '../store/reducers/product.reducer';
import { PaginatorProductSupport, selectPaginatorSupportModel } from '../store/selectors/product.selectors';
import * as ProductSelector from '../store/selectors/product.selectors';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  query: string;
  product: any[] = [];
  orderBy: boolean = true;
  sortBy: string = '';
  url: string = '/product/get-products-by-query/?';
  basecontroller = '/product/get-products-by-query?';



  vm$: Observable<PaginatorProductSupport>;

  constructor(private store: Store<ProductState>,
    private ngxModalService: NgxModalService,
    private queryService: QueryService) { }

  ngOnInit(): void {

    this.vm$ = this.store.pipe(select(ProductSelector.selectPaginatorSupportModel))
    // this.vm$.subscribe(res => {
    //   console.log('RES ', res);

    // })

    // this.functionSortBy(this.url)
  }

  functionSortBy(sortBy: string) {

    this.orderBy = !this.orderBy;
    this.sortBy = sortBy;

    this.query = this.queryService.createFilterUrl(
      { code: '', product: '', category: '', subCategory: '', unitCost: '', unitPrice: '', sortBy:this.sortBy, orderBy:this.orderBy })
    this.store.dispatch(loadProducts({ query: this.query }))

  }
  upLoadProductsFile() {
    // this._modalService.mostrarMultipleFileUploadModal(this.idModal, this.URL_CUSTOMER);
    this.ngxModalService.show(ModalUploadComponent);
  }

  showFormProductModal(){
    this.ngxModalService.show(ProductModalComponent);
    // this.ngxModalService.show(InvoiceFormModalComponent);
  }

  editProduct(product){}

  deleteProduct(product){}

}
