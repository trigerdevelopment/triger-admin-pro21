import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
export interface Ajustes {
  temaUrl: string;
  tema: string;
}


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document: any ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    // console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes )  );
  }

  cargarAjustes() {

    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse( localStorage.getItem('ajustes')! );
      // console.log( 'Cargando del localstorage' );

      this.aplicarTema( this.ajustes.tema );

    }else {
      // console.log( 'Usando valores por defecto' );
      this.aplicarTema( this.ajustes.tema );
    }

  }

  aplicarTema( tema: string ) {


    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();

  }

  setCurrent(i){
   console.log('ELEMENT ', this._document.getElementById(i));
  }

}

