import { NgModule } from '@angular/core';

//Librerias
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

import {HeaderComponent} from "src/app/shared/header/header.component";
import {NopagefoundComponent} from "src/app/shared/nopagefound/nopagefound.component";
import {BreadcrumbsComponent} from "src/app/shared/breadcrumbs/breadcrumbs.component";
import {SidebarComponent} from "src/app/shared/sidebar/sidebar.component";


@NgModule({
 imports: [
   CommonModule,
   RouterModule
 ],
 exports: [
   NopagefoundComponent,
   HeaderComponent,
   SidebarComponent,
   BreadcrumbsComponent
 ],
 declarations: [
   NopagefoundComponent,
   HeaderComponent,
   SidebarComponent,
   BreadcrumbsComponent
 ],
 providers: [],
})
export class SharedModule { }