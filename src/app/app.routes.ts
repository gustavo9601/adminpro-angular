import {RouterModule, Routes} from "@angular/router";

//Componentes
import {LoginComponent} from "src/app/login/login.component";
import {NopagefoundComponent} from "src/app/shared/nopagefound/nopagefound.component";
import {RegisterComponent} from "src/app/login/register.component";
import {LoginGuardGuard} from "src/app/services/guards/login-guard.guard";
import {PagesComponent} from "src/app/pages/pages.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard], //Implementamos el guard que devuelve un booleanno si puede o no cargar la ruta
    loadChildren: './pages/pages.module#PagesModule'  //carga dinamica de Modulos // especificamos el modulo que contiene todos los demas componentes
                                                      // #nombreClaseModulo
  },
  {path: '**', component: NopagefoundComponent}
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
