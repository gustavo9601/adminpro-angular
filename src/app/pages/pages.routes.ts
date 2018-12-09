import {RouterModule, Routes} from "@angular/router";
import {Graficas1Component} from "src/app/pages/graficas1/graficas1.component";
import {ProgressComponent} from "src/app/pages/progress/progress.component";
import {DashboardComponent} from "src/app/pages/dashboard/dashboard.component";
import {PagesComponent} from "src/app/pages/pages.component";
import {AccountSettingsComponent} from "src/app/pages/account-settings/account-settings.component";
import {PromesasComponent} from "src/app/pages/promesas/promesas.component";
import {RxjsComponent} from "src/app/pages/rxjs/rxjs.component";
import {LoginGuardGuard} from "src/app/services/guards/login-guard.guard";


const appRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard], //Implementamos el guard que devuelve un booleanno si puede o no cargar la ruta
    children: [
      //data : {} | ''   => envia informacion de la ruta, que puede ser recibida desde el componente
      {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dahsboard'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress @Input @Output @Viewchild'}},
      {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas @Input'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Settings'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs Observables'}},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]
  }
];


/*
* RouterModule.forChild = Se utilizan por que son hijas
* rutas dentro de rutas padre
* */
export const PAGES_ROUTES = RouterModule.forChild(appRoutes);
