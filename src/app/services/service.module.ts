import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings/settings.service';
import { SidebarService } from './shared/sidebar.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    SettingsService,
    SidebarService
  ]
})
export class ServiceModule { }
