import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from "src/app/services/usuario/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {


  constructor(public _usuarioService: UsuarioService,
              public _router:Router) {

  }

  canActivate(): Promise<boolean> | boolean {

    console.log("Inicio Token Guard");

    let token = this._usuarioService.token;

    //Contenido del token
    //la funcion atob()  //parsea a strin cualquier dato encondeado en base 64
    let payload = JSON.parse(atob(token.split('.')[1]));


    console.log("Token descncriptado", payload);


    let expirado = this.expirado(payload.exp);

    //Si ya expiro el token, retornamos false, para que el guard bloque las pantallas
    if (expirado) {
      this._router.navigate(['/login']);
      return false;
    }


    return this.verificaRenueva(payload.exp);
  }


  expirado(fechaExp: number) {

    let ahora = new Date().getTime() / 1000; //obtenido la fecha actual / 1000 para tener segundos

    //Verificacion que valida la hora expiracion vs la hora actual
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }


  }


  verificaRenueva(fechaExp: number): Promise<boolean> {


    return new Promise((resolve, reject) => {

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();


      //(4 * 60 * 60 * 1000) -> lo incrementamos en 4 horas
      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));

      //Siginifca que el token actual es mayor a 4 horas
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {


        //Token proximo a vencer
        //renovamos el token
        this._usuarioService.renuevaToken()
          .subscribe(
            (respuesta) => {
              console.log("Token renovado");

              resolve(true);  //puede continuar
            }, (error) => {

              this._router.navigate(['/login']);
              reject(false); // impdira que entre
            }
          );

      }

      resolve(true);

    });
  }

}
