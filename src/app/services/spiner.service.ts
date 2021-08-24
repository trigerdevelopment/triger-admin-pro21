import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading: boolean;

  constructor() {
    this.isLoading = false;
    console.log('SPINNER ', this.isLoading);

   }

   show(){
     console.log('SHOW SPINNER', this.isLoading);

     this.isLoading=true;
   }

   hide(){
     console.log('HIDE SPINNER ', this.isLoading);

     this.isLoading=false;
   }
}
