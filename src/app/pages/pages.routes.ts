import {RouterModule, Routes} from "@angular/router";
import {Graficas1Component} from "src/app/pages/graficas1/graficas1.component";
import {ProgressComponent} from "src/app/pages/progress/progress.component";
import {DashboardComponent} from "src/app/pages/dashboard/dashboard.component";
import {PagesComponent} from "src/app/pages/pages.component";
import {AccountSettingsComponent} from "src/app/pages/account-settings/account-settings.component";
import {PromesasComponent} from "src/app/pages/promesas/promesas.component";
import {RxjsComponent} from "src/app/pages/rxjs/rxjs.component";
import {LoginGuardGuard} from "src/app/services/guards/login-guard.guard";
import {PerfilComponent} from "src/app/pages/perfil/perfil.component";
import {UsuariosComponent} from "src/app/pages/usuarios/usuarios.component";
import {HospitalesComponent} from "src/app/pages/hospitales/hospitales.component";
import {MedicosComponent} from "src/app/pages/medicos/medicos.component";
import {MedicoComponent} from "src/app/pages/medicos/medico.component";
import {BusquedaComponent} from "src/app/pages/busqueda/busqueda.component";
import {AdminGuard} from "src/app/services/guards/admin.guard";


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
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},
      {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
      //Mantenimientos
      //Esta ruta pasa por el otro AdminGuard
      {
        canActivate: [AdminGuard],  //verificara que el role sea valido
        path: 'usuarios',
        component: UsuariosComponent,
        data: {titulo: 'Mantenimientos usuarios'}
      },
      {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimientos hospitales'}},
      {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimientos Medicos'}},
      {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico'}}
    ]
  }
];


/*
* RouterModule.forChild = Se utilizan por que son hijas
* rutas dentro de rutas padre
* */
export const PAGES_ROUTES = RouterModule.forChild(appRoutes);
