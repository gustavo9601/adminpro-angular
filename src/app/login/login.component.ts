import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

import {UsuarioService} from "src/app/services/service.index";
import {Usuario} from "src/app/models/usuario.model";

declare function init_plugins(); //funcion que esta en el customm.js la declaramos
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['/login.component.css']
})
export class LoginComponent implements OnInit {

  public recuerdame: boolean = false;
  public email: string;
  public auth2: any;

  constructor(public router: Router,
              public _usuarioService: UsuarioService) {


  }

  /*=====================================================================================*/
  /*GOOGLE NO FUNCIONAL*/

  /*=====================================================================================*/
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        clien_id: '22928236553-bsaj1oovukioqifapq6d14srlrqrm5st.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile_email'
      });
      this.attachSigin(document.getElementById('btnGoogle'));
    });
  }

  attachSigin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      /* let profile = googleUser.getBasicProfile();
       console.log("Perfil de google", profile);*/
      let token = googleUser.getAuthResponse().id_token;
      console.log("Token de google", token);
    });
  }

  /*=====================================================================================*/
  /*=====================================================================================*/

  /*=====================================================================================*/


  ngOnInit() {

    init_plugins();
    this.googleInit();

    //Cargara el email de existir en el local storage
    this.email = localStorage.getItem('email') || "";
    if (this.email.length > 1) {
      this.recuerdame = true;
    }


  }

  ingresar(forma: NgForm) {
    console.log("Formulario", forma);
    console.log("Formulario Valido", forma.valid);
    console.log("Formulario Value", forma.value);

    //this.router.navigate(['/dashboard']);

    if (forma.invalid) {
      return;
    }

    //Creamos un objeto de tipo usuario
    //Simulamos los datos y enviamos los daos de email y password al objeto usuario
    let usuario = new Usuario(null, forma.value.email, forma.value.password);


    //Ejecutamos el servicio
    this._usuarioService.login(usuario, this.recuerdame)
      .subscribe(
        (respuesta) => {
          console.log("respuesta login", respuesta);

          this.router.navigate(['/dashboard']);

        },
        (error) => {
          console.log("error login", error);
        }
      );
  }

}
