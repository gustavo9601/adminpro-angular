import { NgModule } from '@angular/core';

//Librerias
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

import {HeaderComponent} from "src/app/shared/header/header.component";
import {NopagefoundComponent} from "src/app/shared/nopagefound/nopagefound.component";
import {BreadcrumbsComponent} from "src/app/shared/breadcrumbs/breadcrumbs.component";
import {SidebarComponent} from "src/app/shared/sidebar/sidebar.component";
import {PipesModule} from "src/app/pipes/pipes.module";
import {ModalUploadComponent} from "src/app/components/modal-upload/modal-upload.component";


@NgModule({
 imports: [
   CommonModule,
   RouterModule,
   PipesModule
 ],
 exports: [
   NopagefoundComponent,
   HeaderComponent,
   SidebarComponent,
   BreadcrumbsComponent,
   ModalUploadComponent
 ],
 declarations: [
   NopagefoundComponent,
   HeaderComponent,
   SidebarComponent,
   BreadcrumbsComponent,
   ModalUploadComponent
 ],
 providers: [],
})
export class SharedModule { }
