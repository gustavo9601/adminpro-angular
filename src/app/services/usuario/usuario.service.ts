import {Injectable} from '@angular/core';
import {Usuario} from "src/app/models/usuario.model";
import {HttpClient} from "@angular/common/http";

import {URL_SERVICIOS} from "src/app/config/config";
import {map} from "rxjs/internal/operators";
import {catchError} from "rxjs/internal/operators";
import {Router} from "@angular/router";
import {SubirArchivoService} from "src/app/services/subir-archivo/subir-archivo.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public usuario: Usuario;
  public token: string;
  public menu: Array<string>;


  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) {
    //Inicializando la carga de storage
    this.cargarStorage();

  }


  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken?token=' + this.token;

    return this.http.get(url).pipe(
      map((respuesta: any) => {

        //Sobrescribiendo el token
        this.token = respuesta.token;

        //Seteamis de nuevo en el local storage el token
        localStorage.setItem('token', respuesta.token);

        return respuesta;

      })
    )

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

          console.log("Respues del login ingresar", respuesta);

          this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario, respuesta.menu);

          return true;

        })
      )
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

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  estaLogueado() {

    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }


  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;


    console.log("Usuario a enviar a la peticion", usuario);

    return this.http.put(url, usuario).pipe(
      map(
        (respuesta: any) => {


          //Verificacion si la actualizacion es para el propio usuario
          if (usuario._id === this.usuario._id) {
            //Actualizando el local storage
            this.guardarStorage(respuesta.usuario._id, this.token, respuesta.usuario, this.menu);
          }
          return respuesta;


        }
      )
    );
  }


  cambiarImagen(usuario: any, id: string) {



    /*this._subirArchivoService.subirArchiv2(arhivo, 'usuario', id)
      .then((respuesta) => {
        console.log("Respuesta", respuesta);
      }).catch((error) => {
      console.log("Error", error);
    });*/

    this._subirArchivoService.subirArchivo2(usuario, 'usuario', id)
  }


  cargarUsuarios(desde: number) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url)
      .pipe(map(
        (respuesta) => {
          return respuesta;
        }
      ));
  }

  buscarUsuarios(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe(
      map(
        (respuesta: any) => {
          return respuesta.usuarios;
        }
      )
    )

  }


  borrarUsuario(id) {

    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url).pipe(
      map(
        (respuesta) => {
          return respuesta;
        }
      )
    )

  }


}
