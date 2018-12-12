import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ChartsModule} from 'ng2-charts';
import {CommonModule} from "@angular/common";

//Modules
import {SharedModule} from "src/app/shared/shared.module";
import {PipesModule} from "src/app/pipes/pipes.module";
//Rutas
import {PAGES_ROUTES} from "src/app/pages/pages.routes";

//Components
import {DashboardComponent} from "src/app/pages/dashboard/dashboard.component";
import {ProgressComponent} from "src/app/pages/progress/progress.component";
import {Graficas1Component} from "src/app/pages/graficas1/graficas1.component";
import {PagesComponent} from "src/app/pages/pages.component";
import {IncrementadorComponent} from "src/app/components/incrementador/incrementador.component";
import {GraficoDonaComponent} from "src/app/components/grafico-dona/grafico-dona.component";
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    PAGES_ROUTES,
    ChartsModule,
    PipesModule,
    CommonModule]/*Modulos*/,
  exports: [/*Componentes accesados desde otros modulos*/
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraficoDonaComponent,
    Graficas1Component,
    IncrementadorComponent
  ],
  declarations: [/*Componentes localmente*/
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraficoDonaComponent,
    Graficas1Component,
    IncrementadorComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent
  ],
  providers: [],
})
export class PagesModule {
}
