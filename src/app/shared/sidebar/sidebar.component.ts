import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { AuthSessionService } from '../../services/auth/auth-session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user:string ='';
  localStorage: Storage;
  isAdmin:boolean = false;
  isSales:boolean = false;
  isPurchase:boolean = false;
  isProduction:boolean = false;
  isDepot:boolean = false;
  isConta:boolean = false;


  private readonly ROLE_ADMIN = 'ROLE_ADMIN';

  constructor(public _sidebar: SidebarService,
              public _authority: AuthSessionService) { }

  ngOnInit(): void {
    const roles  = this._authority.getAuthorities();
    this.user = this._authority.getUserName();

   roles.forEach((rol: string) => {
    if (rol === 'ROLE_ADMIN') {
     this.isAdmin = true;
    }
    if (rol === 'ROLE_VENTAS') {
      this.isSales = true;
     }
     if (rol === 'ROLE_COMPRAS') {
      this.isPurchase = true;
     }
     if (rol === 'ROLE_PRODUCCION') {
      this.isProduction = true;
     }
     if (rol === 'ROLE_ALMACEN') {
      this.isDepot = true;
     }
     if (rol === 'ROLE_CONTA') {
      this.isConta = true;
     }
  });


  }

}
