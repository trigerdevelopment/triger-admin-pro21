import { Component, OnInit } from '@angular/core';
import { ModalProductCategoryComponent } from 'src/app/modals/modal-product-category/modal-product-category.component';
import { CategoryService } from 'src/app/services/category.service';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { SpinnerService } from 'src/app/services/spiner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  types: any[] = [];
  taskEnd: boolean = false;
  // storeSuscribe: Subscription;



  constructor(
              private ngxModalService: NgxModalService,
              private spinnerService: SpinnerService,
              // public _customerService: CustomerService,
              public _categoryService: CategoryService,
              ) { }


              ngOnDestroy(): void {

  }

  ngOnInit() {
    this._categoryService.refreshNeeded$.subscribe(() => {
      this.spinnerService.hide();
      this.getTasks();

    });

      this.getTasks();
  }

  mostrarUserRegModal(){
    this.ngxModalService.show(ModalProductCategoryComponent);

  }

  getTasks() {
    this._categoryService.getProductCategories().subscribe(res => {
      this.types = res;

    })
  }

  deleteType(event){

    Swal.fire({
      title: 'Esta segur@?',
      text: "Al borrar los datos no se podran recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoryService.deleteType(event).subscribe(res => {
        })
        Swal.fire(
          'Deleted!',
          'Your data  has been deleted.',
          'success'
        )
      }
    })
  }



}
