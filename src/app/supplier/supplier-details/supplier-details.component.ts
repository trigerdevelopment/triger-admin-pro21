import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {

  id:any;
  supplier:any;

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private router: Router
  ) { }

  ngOnInit(): void {


   this.route.params.subscribe(params => {
    this.id = +params['id']; // (+) converts string 'id' to a number

 });

 this.supplierService.getSupplierById(this.id).subscribe(res => {
 this.supplier = res;
})
  }

  editar(){
    this.router.navigate(['supplier/supplier-edit', this.id]);

  }

}
