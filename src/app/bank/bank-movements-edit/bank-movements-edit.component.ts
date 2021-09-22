import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankService } from 'src/app/services/bank.service';
import { BankMovementsFormService } from '../bank-movements-form.service';

@Component({
  selector: 'app-bank-movements-edit',
  templateUrl: './bank-movements-edit.component.html',
  styleUrls: ['./bank-movements-edit.component.css']
})
export class BankMovementsEditComponent implements OnInit {

  id: any;
  supplier: any;
  edit: boolean = false;
  valid:boolean = false;
  customerType: any[];

  constructor(
    private route: ActivatedRoute,
    public form: BankMovementsFormService,
    public bankService: BankService,
  ) {


  }

  ngOnDestroy() {
    this.form.cleanForm();

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });

    if(this.id){
      console.log('ID ', this.id);

      this.bankService.getBankMovById(this.id).subscribe(res => {
        this.edit= true;

        this.form.filledForm(res);
      });

    }

    // this.categoryService.refreshNeeded$.subscribe(() => {
    //   this.spinnerService.hide();
    //   this.getTypes();

    // })


      this.getTypes();

  }

  getTypes(){

    // this.categoryService.getCategories().subscribe(res => {
    //   this.customerType=res;
    // })
  }


  mostrarTypeModal(){
    // this.ngxModalService.show(ModalTypeComponent);

  }



}
