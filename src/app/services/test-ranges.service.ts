import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestRangesService {

  constructor() { }


  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
 }

 DifferenceDays( ini?: any, final?: any){

  const Difference_In_Time = ini.getTime()-final.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    console.log('DIFERENCIA DE DIAS ', Difference_In_Days);
 }
}
