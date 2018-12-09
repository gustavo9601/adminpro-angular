import {Injectable} from '@angular/core';
import {Usuario} from "src/app/models/usuario.model";
import {HttpClient} from "@angular/common/http";

import {URL_SERVICIOS} from "src/app/config/config";
import {map} from "rxjs/internal/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public usuario: Usuario;
  public token: string;
  public menu: Array<string>;


  constructor(public http: HttpClient,
              public router:Router) {
    //Inicializando la carga de storage
    this.cargarStorage();

  }

  /*=====================================================================================*/
  /*GOOGLE NO FUNCIONAL*/

  /*=====================================================================================*/
  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
      .pipe(map((respuesta: any) => {
        // this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
        return true;
      }));

  }

  /*=====================================================================================*/
  /*=====================================================================================*/

  /*=====================================================================================*/


  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .pipe(map((respuesta: any) => {

        //retornamos la respuesta
        return respuesta;

      }));
  }

  login(usuario: Usuario, recordar: boolean = false) {


//Grabara en l local storage el email para recordarlo en el input
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }


    let url = URL_SERVICIOS + '/login';

    //El servicio detencta que si recibe un error
    // No se ejcutara la actual promesa y el observable en el componente de login

    return this.http.post(url, usuario)
      .pipe(map((respuesta: any) => {


          this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario);

          return true;

        }
      ))
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario/*, menu: any */) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    /*    localStorage.setItem('menu', JSON.stringify(menu) );*/

    this.usuario = usuario;
    this.token = token;
    /*  this.menu = menu;
    */
  }

  estaLogueado() {

    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      //  this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      // this.menu = [];
    }

  }

}
