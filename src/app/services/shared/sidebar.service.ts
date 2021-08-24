import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  // menu: any[] = [];

  menuTask: any = [
    {
      titulo: "Utilerias",
      icono: "mdi mdi-account-multiple",
      submenu: [
        { titulo: "Listado de Tareas", url: "/dashboard/tareas" },
        { titulo: "Lista de Categorias", url: "/dashboard/types" },
        { titulo: "Categorias de Productos", url: "/dashboard/product-category-list" },
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
      icono: "mdi mdi-account-card-details",
      submenu: [
        { titulo: "Lista Facturas", url: "/customer/invoice" },
        { titulo: "Lista de Clientes", url: "/customer/list" },
        { titulo: "Ventas por Cliente", url: "/clientes/ventas-por-cliente" },
        { titulo: "Agregar Factura", url: "/customer/add-invoice" },
        { titulo: "Agregar un Cliente", url: "/customer/add-customer" },

      ],
    },
  ];
  menuProveedores: any = [
    {
      titulo: "Proveedores",
      icono: "mdi mdi-bank",
      submenu: [
        { titulo: "Lista de Facturas", url: "/supplier/invoice-list" },
        { titulo: "Lista de Proveedores", url: "/supplier/supplier-list" },
        { titulo: "Agregar Factura", url: "/supplier/add-invoice" },
        { titulo: "Agragar Proveedor", url: "/supplier/add-supplier" },
      ],
    },
  ];

  menuProduccion: any = [
    {
      titulo: "Produccion",
      icono: "mdi mdi-factory",
      submenu: [
        { titulo: "Listado de Producciones", url: "/manufacture/production-list" },
        {
          titulo: "Agregar Produccion", url: "/manufacture/add-production",
        },
        { titulo: "Productos", url: "/manufacture/production-list" },
      ],
    },
  ];

  menuInventory: any = [
    {
      titulo: "Inventarios",
      icono: "mdi mdi-format-list-bulleted",
      submenu: [
        { titulo: "Productos", url: "/product/list" },
        { titulo: "Inventarios", url: "/inventory/inventory-list" },
      ],
    },
  ];


  menuReportes: any = [
    {
      titulo: "Reportes",
      icono: "mdi mdi-bank",
      submenu: [
        { titulo: "Ventas", url: "/reports/sales" },
        { titulo: "Compras", url: "/reports/purchase" },
      ],
    },
  ];

}
