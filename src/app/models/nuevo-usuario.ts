export class NuevoUsuario {
  id:string;
  nombre: string;
  apellido:string;
  nombreUsuario: string;
  enabled:boolean;
  email: string;
  password: string;
  roles:any[];
  constructor(nombre: string, nombreUsuario: string, email: string, password: string) {
      this.nombre = nombre;
      this.nombreUsuario = nombreUsuario;
      this.email = email;
      this.password = password;
  }
}
