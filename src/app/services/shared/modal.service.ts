import { Injectable } from "@angular/core";
import { FormTaskService } from '../form-services/form-task.service';

@Injectable({
  providedIn: "root",
})
export class ModalService {

  modalUpload = "ocultar";
  multipleUpload = "ocultar";
  multipleFileUpload="ocultar";
  modalPayment="ocultar";
  modalProveedor = "ocultar";
  modalProducto = "ocultar";
  modalUser = "ocultar";
  modalUserCard = "ocultar";
  modalTask="ocultar";
  tipo: string = "";
  url: string = "";

  constructor(public _formUser: FormTaskService) {}

  mostrarModalUpload(tipo: string, url: string) {
    this.modalUpload = "";
    this.tipo = tipo;
    this.url = url;
  }

  cerrarModalUpload() {
    this.modalUpload = "ocultar";
  }

  mostrarMultipleModalUpload(tipo: string, url: string) {
    this.multipleUpload = "";
    this.tipo = tipo;
    this.url = url;
  }

  mostrarMultipleFileUploadModal(tipo: string, url:string){
    this.multipleFileUpload="";
    this.tipo = tipo;
    this.url = url;
  }

  mostrarPaymentModal(tipo: string, url:string){
    this.modalPayment="";
    this.tipo = tipo;
    this.url = url;
  }

  cerrarPaymentModal(){
    this.modalPayment="ocultar";
  }

  cerrarMultipleModalUpload(){
    this.multipleUpload="ocultar";
  }

  cerrarMultipleFileUpolad(){
    console.log('MOSTRAR ', this.multipleFileUpload);

    this.multipleFileUpload="ocultar";
  }



  mostrarModalProveedor(tipo: string, url: string) {
    this.modalProveedor = "";
    this.tipo = tipo;
    this.url = url;
  }

  cerrarModalProveedor() {
    this.modalProveedor = "ocultar";
  }

  mostrarModalProducto(tipo: string, url: string) {
    this.modalProducto = "";
    this.tipo = tipo;
    this.url = url;
  }

  cerrarModalProducto() {
    this.modalProducto = "ocultar";
  }

  mostrarModalUserRegister() {
    this.modalUser = "";
  }
      cerrarModalUserRegister() {
        this.modalUser = "ocultar";
        this._formUser.taskId = false;
        this._formUser.clearForm();
      }

  mostrarModalUserCard(tipo: string, url:string){

    this.modalUserCard = '';
    this.tipo = tipo;
    this.url = url;
    console.log('tipo', this.tipo);
    console.log('url', this.url);
  }

  cerrarModalUserCard(){
    this.modalUserCard = 'ocultar';
    this._formUser.clearForm();
  }

  mostrarModalTask() {
    this.modalTask = "";
  }

  cerrarModalTask(){
    this.modalTask = "ocultar";
  }

}
