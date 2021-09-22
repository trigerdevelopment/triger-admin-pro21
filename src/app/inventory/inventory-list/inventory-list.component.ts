import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  inventory: any[];
  sum: number;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.getInventory('').subscribe(res => {
      console.log('INVENTORY ', res);
        this.inventory = res;
        this.getSum();
    })
  }

  getSum() {
     this.sum = 0;
    if(this.inventory){

      for(let i = 0; i < this.inventory.length; i++) {
        this.sum += this.inventory[i].totalCost;
      }
    }
    // return sum;
  }

}
