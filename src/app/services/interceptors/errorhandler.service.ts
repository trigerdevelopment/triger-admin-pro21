import { Injectable, Injector, ErrorHandler, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService implements ErrorHandler {
  constructor(
    private ngZone: NgZone,
    private injector: Injector,
    private router: Router
  ) //   private sanckbar: SnackbarService
  {}

  handleError(error: any): void {
    console.log('ERROR ', error);
    console.log('ERROR STATUS', error.status);

    const router = this.injector.get(Router);
    // console.log('ERROR EN ERROR SERVICE ', error);

    if (error.status === 401 || error.status === 403) {
      console.log('Contraseña incorrecta');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'tiempo de sesion ha terminado, vuelva a iniciar',
        footer: '<a href>Why do I have this issue?</a>'
      })

       this.ngZone.run(() => router.navigate(["login"]));
    }

    if (error.status === 404) {
      console.log("ERROR 404 ", error);
      // swal('Mensaje del Servidor:', `El Cliente no existe ${error.error.nameCustomer} desea darlo de alta`, 'error');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'tiempo de sesion ha terminado, vuelva a iniciar',
        footer: '<a href>Why do I have this issue?</a>'
      })
    }

    if (error.status === 417) {
      console.log("ERROR 417 ", error.error);
      // this.sanckbar.warn('Error al enviar datos');
      //  this.refreshNeeded$;
      //  router.navigate(['customer/upload']);
      //   this.ngZone.run(() => router.navigate(['customer/upload']));

      Swal.fire({
        icon: "error",
        text: error.error,
        title: "Error en envio de datos"
      });
    }
    if (error.status === 400) {
      console.log("ERROR 400 ", error.error);

      Swal.fire({
        icon: "error",
        text: "Mensaje del Servidor" +": "+ error.error.mensaje,
        title: "Verifique su peticion"
      });
    }

    if (error.status === 409) {
      console.log("ERROR 409 ", error.error);

      Swal.fire({
        icon: "error",
        text: error.error,
        title: "Error en envio de datos"
      });
    }

    if (error.status === 505) {
      console.log("ERROR 505 ", error);

      Swal.fire({
        icon: "error",
        text: error.error,
        title: "El Archivo no puede se procesado"
      });
    }

    if (error.status === 503) {
      console.log("ERROR 503 ", error);

      Swal.fire({
        icon: "error",
        text: error.error,
        title: "Su Requerimiento no contiene Datos"
      });
    }

    if (error.status === 204) {
      // A client-side or network error occurred.
      console.error("An error occurred:", error);
      //  router.navigate(['/login']);
    }
    // if (error.status === 409) {
    //   // A client-side or network error occurred.
    //   console.error('An error occurred:', error);
    //   this.sanckbar.fail(error.error);
    //   //  router.navigate(['/login']);
    // }
  }

}
