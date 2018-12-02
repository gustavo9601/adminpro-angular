import {RouterModule, Routes} from "@angular/router";

//Componentes
import {LoginComponent} from "src/app/login/login.component";
import {NopagefoundComponent} from "src/app/shared/nopagefound/nopagefound.component";
import {RegisterComponent} from "src/app/login/register.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NopagefoundComponent}
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
