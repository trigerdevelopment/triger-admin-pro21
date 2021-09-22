import { Injectable } from '@angular/core';
import { Filter } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  queryData:string='';

  filter1: Filter = {
    'iniDate': '',
    'finalDate': '',
    'serie': '',
    'rfc':'',
    'categoria':'',
    'folio': '',
    'finalFolio': '',
    'company': '',
    'sucursal': '',
    'total': '',
    'total2': '',
    'pageNo': 0,
    'pageSize': '',
    'sortBy': '',
    'orderBy': true

  }
  filter3: any = {
    'iniDate': '',
    'finalDate': '',
    'cuenta': '',
    'referencia':'',
    'descripcion':'',
    'codTransac': '',
    'depositos': '',
    'retiros': '',
    'movimiento': '',
    'descripcionDetallada': '',
    'pageNo': 0,
    'pageSize': '',
    'sortBy': '',
    'orderBy': true

  }

  filter2: any = {
    'initialDate': '',
    'finalDate': '',
    'product':'',
    'code':'',
    'batch': '',
    'quantity': '',
    'pageNo': 0,
    'pageSize': '',
    'sortBy': '',
    'orderBy': true

  }


  constructor() { }

  customerFilter(
{ company = '', sucursal = '', rfc = '', categoria ='', total = '', pageNo = null, pageSize = '', sortBy = '', orderBy = true}: { company?: string; sucursal?: string; rfc?:string,categoria?:string, total?: string; pageNo?: number; pageSize?: string; sortBy?: string; orderBy?: boolean }
  ): string {
    var prepend = '';
    var query = '';
    if (company) {
      query = `${query}` + prepend + `company=${company}`;
      prepend = '&';
    }
    if (rfc) {
      query = `${query}` + prepend + `rfc=${rfc}`;
      prepend = '&';
    }
    if (categoria) {
      query = `${query}` + prepend + `categoria=${categoria}`;
      prepend = '&';
    }
    if (sucursal) {
      query = `${query}` + prepend + `sucursal=${sucursal}`;
      prepend = '&';
    }
    if (total) {
      query = `${query}` + prepend + `total=${total}`;
      prepend = '&';
    }
    if (pageNo) {
      query = `${query}` + prepend + `pageNo=${pageNo}`;
      prepend = '&';
    }
    if (pageSize) {
      query = `${query}` + prepend + `pageSize=${pageSize}`;
      prepend = '&';
    }
    if (sortBy) {
      query = `${query}` + prepend + `sortBy=${sortBy}`;
      prepend = '&';
    }
    if (orderBy) {
      query = `${query}` + prepend + `orderBy=${orderBy}`;
      prepend = '&';
    }else{
      query = `${query}` + prepend + `orderBy=false`;
      prepend = '&';
    }

    // query = `${query}` + prepend + `_sort=price`;
    this.queryData = query;
    return query;
  }

  productionFilter(
{ initialDate = '', finalDate = '', product = '', code ='', batch = '', quantity = '',pageNo = null, pageSize = '', sortBy = '', orderBy = true}: { initialDate?: string; finalDate?: string; product?:string,code?:string, batch?: string; quantity?:string; pageNo?: number; pageSize?: string; sortBy?: string; orderBy?: boolean }
  ): string {
    var prepend = '';
    var query = '';
    if (initialDate) {
      query = `${query}` + prepend + `initialDate=${initialDate}`;
      prepend = '&';
    }
    if (finalDate) {
      query = `${query}` + prepend + `finalDate=${finalDate}`;
      prepend = '&';
    }
    if (product) {
      query = `${query}` + prepend + `product=${product}`;
      prepend = '&';
    }
    if (code) {
      query = `${query}` + prepend + `code=${code}`;
      prepend = '&';
    }
    if (batch) {
      query = `${query}` + prepend + `batch=${batch}`;
      prepend = '&';
    }
    if (quantity) {
      query = `${query}` + prepend + `quantity=${quantity}`;
      prepend = '&';
    }

    if (pageNo) {
      query = `${query}` + prepend + `pageNo=${pageNo}`;
      prepend = '&';
    }
    if (pageSize) {
      query = `${query}` + prepend + `pageSize=${pageSize}`;
      prepend = '&';
    }
    if (sortBy) {
      query = `${query}` + prepend + `sortBy=${sortBy}`;
      prepend = '&';
    }
    if (orderBy) {
      query = `${query}` + prepend + `orderBy=${orderBy}`;
      prepend = '&';
    }else{
      query = `${query}` + prepend + `orderBy=false`;
      prepend = '&';
    }

    // query = `${query}` + prepend + `_sort=price`;
    this.queryData = query;
    return query;
  }

 bankFilter(
{ initialDate = '', finalDate = '', cuenta = '', referencia='', descripcion= '', codTransac = '',depositos='', retiros='',movimiento='',descripcionDetallada='',pageNo = null, pageSize = '', sortBy = '', orderBy = true}: { initialDate?: string; finalDate?: string; cuenta?:string,referencia?:string, descripcion?: string; codTransac?:string; depositos?:string;retiros?:string;movimiento?:string;descripcionDetallada?: string;pageNo?: number; pageSize?: string; sortBy?: string; orderBy?: boolean }
  ): string {
    var prepend = '';
    var query = '';
    if (initialDate) {
      query = `${query}` + prepend + `initialDate=${initialDate}`;
      prepend = '&';
    }
    if (finalDate) {
      query = `${query}` + prepend + `finalDate=${finalDate}`;
      prepend = '&';
    }
    if (cuenta) {
      query = `${query}` + prepend + `cuenta=${cuenta}`;
      prepend = '&';
    }
    if (referencia) {
      query = `${query}` + prepend + `referencia=${referencia}`;
      prepend = '&';
    }
    if (descripcion) {
      query = `${query}` + prepend + `descripcion=${descripcion}`;
      prepend = '&';
    }
    if (codTransac) {
      query = `${query}` + prepend + `codTransac=${codTransac}`;
      prepend = '&';
    }
    if (depositos) {
      query = `${query}` + prepend + `depositos=${depositos}`;
      prepend = '&';
    }
    if (retiros) {
      query = `${query}` + prepend + `retiros=${retiros}`;
      prepend = '&';
    }
    if (movimiento) {
      query = `${query}` + prepend + `movimiento=${movimiento}`;
      prepend = '&';
    }
    if (descripcionDetallada) {
      query = `${query}` + prepend + `descripcionDetallada=${descripcionDetallada}`;
      prepend = '&';
    }

    if (pageNo) {
      query = `${query}` + prepend + `pageNo=${pageNo}`;
      prepend = '&';
    }
    if (pageSize) {
      query = `${query}` + prepend + `pageSize=${pageSize}`;
      prepend = '&';
    }
    if (sortBy) {
      query = `${query}` + prepend + `sortBy=${sortBy}`;
      prepend = '&';
    }
    if (orderBy) {
      query = `${query}` + prepend + `orderBy=${orderBy}`;
      prepend = '&';
    }else{
      query = `${query}` + prepend + `orderBy=false`;
      prepend = '&';
    }

    // query = `${query}` + prepend + `_sort=price`;
    this.queryData = query;
    return query;
  }



  createFilterUrl(
{ code, productName, category, subCategory, unitCost, unitPrice, iniDate = null, finalDate = '', iniFolio = '', finalFolio = '', company = '', sucursal = '', total = '', total2 = '', pageNo = null, pageSize = '', sortBy = '', orderBy = true }: { code?; productName?; category?; subCategory?; unitCost?; unitPrice?; iniDate?; finalDate?; iniFolio?; finalFolio?; company?: string; sucursal?: string; total?: string; total2?: string; pageNo?: number; pageSize?: string; sortBy?: string; orderBy?: boolean },
  ): string {
    var prepend = '';
    //var query = this.baseUrl + 'products?';
     var query = '';
    // var query ='';
    if (code) {
      query = `${query}` + prepend + `code=${code}`;
      prepend = '&';
    }
    if (productName) {
      query = `${query}` + prepend + `productName=${productName}`;
      prepend = '&';
    }
    if (category) {
      query = `${query}` + prepend + `category=${category}`;
      prepend = '&';
    }
    if (subCategory) {
      query = `${query}` + prepend + `subCategory=${subCategory}`;
      prepend = '&';
    }
    if (unitCost) {
      query = `${query}` + prepend + `unitCost=${unitCost}`;
      prepend = '&';
    }
    if (unitPrice) {
      query = `${query}` + prepend + `unitPrice=${unitPrice}`;
      prepend = '&';
    }
    if (iniDate) {
      query = `${query}` + prepend + `iniDate=${iniDate}`;
      prepend = '&';
    }
    if (finalDate) {
      query = `${query}` + prepend + `finalDate=${finalDate}`;
      prepend = '&';
    }
    if (iniFolio) {
      query = `${query}` + prepend + `iniFolio=${iniFolio}`;
      prepend = '&';
    }
    if (finalFolio) {
      query = `${query}` + prepend + `finalFolio=${finalFolio}`;
      prepend = '&';
    }
    if (company) {
      query = `${query}` + prepend + `company=${company}`;
      prepend = '&';
    }
    if (sucursal) {
      query = `${query}` + prepend + `sucursal=${sucursal}`;
      prepend = '&';
    }
    if (total) {
      query = `${query}` + prepend + `total=${total}`;
      prepend = '&';
    }
    if (total2) {
      query = `${query}` + prepend + `total2=${total2}`;
      prepend = '&';
    }
    if (pageNo) {
      query = `${query}` + prepend + `pageNo=${pageNo}`;
      prepend = '&';
    }
    if (pageSize) {
      query = `${query}` + prepend + `pageSize=${pageSize}`;
      prepend = '&';
    }
    if (sortBy) {
      query = `${query}` + prepend + `sortBy=${sortBy}`;
      prepend = '&';
    }

    if (orderBy) {
      query = `${query}` + prepend + `orderBy=${orderBy}`;
      prepend = '&';
    }else{
      query = `${query}` + prepend + `orderBy=false`;
      prepend = '&';
    }

    // query = `${query}` + prepend + `_sort=price`;
    this.queryData = query;
    return query;
  }

  addPageToQuery(
    pageNo='',
    baseurl:string

  ):string{
    return baseurl + '&' + `pageNo=${pageNo}`;;
  }

  getDataQuery():string{
    console.log('QUERY ', this.queryData);

    return this.queryData;
  }
}
