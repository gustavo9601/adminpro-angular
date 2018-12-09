import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

//Router
import {APP_ROUTES} from "src/app/app.routes";

//Modulos
import {PagesModule} from "src/app/pages/pages.module";

//Componentes
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register.component';


//Modulo de servicios
import {ServiceModule} from "src/app/services/service.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [/*Modulos*/
    BrowserModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
