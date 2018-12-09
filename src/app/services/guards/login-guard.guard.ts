import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsuarioService} from "src/app/services/usuario/usuario.service";


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService:UsuarioService,
              public router:Router){

  }

  canActivate(){

    if(this._usuarioService.estaLogueado()){
      console.log("Paso el Login Guard");
      return true;
    }else{
      this.router.navigate(['/login']);
      console.log("No paso el Guard");
    }


  }
}
