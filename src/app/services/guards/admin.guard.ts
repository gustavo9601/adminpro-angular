import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from "src/app/services/usuario/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService) {

  }

  canActivate() {

    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log("Bloqueado por el admin Guard");


      //Logout cierra cesion y redirecciona al login
      this._usuarioService.logout();

      return false;
    }


  }
}
