import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { SpinnerService } from 'src/app/services/spiner.service';

@Component({
  selector: 'app-modal-type',
  templateUrl: './modal-type.component.html',
  styleUrls: ['./modal-type.component.css']
})
export class ModalTypeComponent implements OnInit {

  form: FormGroup;
  isspinner: boolean = false;
  types: any[];

  constructor(private f: FormBuilder,
    public spinnerService: SpinnerService,
    // private customerService: CustomerService,
    private categoryService: CategoryService,
    private ngxModalService: NgxModalService,
  ) { }

  ngOnInit() {


    this.form = this.f.group({
      name: [''],

    });

    this.categoryService.getCategories().subscribe(res => {
        this.types = res;
    })
  }

  onSubmit() {

   this.spinnerService.show();

      this.categoryService.createType(this.form.value).subscribe(res => {
        this.closeModal();

      })
  }

  closeModal() {
    this.ngxModalService.hide()
  }


}
