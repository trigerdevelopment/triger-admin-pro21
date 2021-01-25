import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  // menu: any[] = [];

  menuTask: any = [
    {
      titulo: "Tareas",
      icono: "mdi mdi-account-multiple",
      submenu: [
        { titulo: "Listado de Tareas", url: "/dashboard/tareas" },
        // { titulo: "Forma de Usuarios", url: "/form-user-register" },
        // { titulo: "Lista de Usuarios Registrados", url: "/usuarios-registrados" },

      ],
    },
  ];


  menuUser: any = [
    {
      titulo: "Usuarios",
      icono: "mdi mdi-account-multiple",
      submenu: [
        { titulo: "Listado de Usuarios", url: "/dashboard/usuarios" },
        { titulo: "Forma de Usuarios", url: "/form-user-register" },
        { titulo: "Lista de Usuarios Registrados", url: "/usuarios-registrados" },

      ],
    },
  ];

  menuBank: any = [
    {
      titulo: "Bancos",
      icono: "mdi mdi-bank",
      submenu: [
        { titulo: "Dashboard", url: "/dashboard" },
        { titulo: "Cuentas Bancarias", url: "/bancos/lista-cuentas" },
        { titulo: "Movimientos Bancarios", url: "/bancos/movimientos-bancarios" },

      ],
    },
  ];
  menuClientes: any = [
    {
      titulo: "Clientes",
      icono: "mdi mdi-bank",
      submenu: [
        { titulo: "Lista Facturas", url: "/clientes/lista-facturas" },
        { titulo: "Ventas por Cliente", url: "/clientes/ventas-por-cliente" },
      ],
    },
  ];
  menuProveedores: any = [
    {
      titulo: "Proveedores",
      icono: "mdi mdi-bank",
      submenu: [
        { titulo: "Proveedores", url: "supplier/supplier-list" },
        { titulo: "Facturas", url: "supplier/invoice-list" },
      ],
    },
  ];

  menuReportes: any = [
    {
      titulo: "Reportes",
      icono: "mdi mdi-bank",
      submenu: [
        { titulo: "Ventas", url: "/reportes/reporte-ventas" },
      ],
    },
  ];

}
