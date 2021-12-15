import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  inventory: any[];
  rawMaterials: any[]=[];
  sum: number;
  sum2: number;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.getInventory('').subscribe(res => {
      console.log('INVENTORY ', res);
      this.inventory = res;
      this.getSum();
    });

    this.inventoryService.getRawMaterialInventory('').subscribe(res =>{
      this.rawMaterials = res;
      console.log('INVENTORY RAWMATERIALS ', res);
      this.getRawMaterialSum();
      })

  }

  getSum() {
     this.sum = 0;
    if(this.inventory){

      for(let i = 0; i < this.inventory.length; i++) {
        if(this.inventory[i].quantity > 0){
          this.sum += this.inventory[i].unitCost * this.inventory[i].quantity ;
        }
      }
    }
    // return sum;
  }

  getRawMaterialSum() {
     this.sum2 = 0;
    if(this.rawMaterials.length >0){

      for(let i = 0; i < this.rawMaterials.length; i++) {
        if(this.rawMaterials[i].quantity > 0){
          this.sum2 += this.rawMaterials[i].unitCost * this.rawMaterials[i].quantity ;
        }
      }
    }
    // return sum;
  }

}
