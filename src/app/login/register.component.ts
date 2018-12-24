import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
//Libreria de sweet alert
//import * as swal from 'sweetalert';
import Swal from 'sweetalert2'


//Servicio
import {UsuarioService} from "src/app/services/service.index";
import {Usuario} from "src/app/models/usuario.model";
import {Router} from "@angular/router";

//Servicio


declare function init_plugins(); //funcion que esta en el customm.js la declaramos


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['/login.component.css']
})
export class RegisterComponent implements OnInit {


  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService,
              public router: Router) {
  }

  ngOnInit() {


    init_plugins();


    /*
    *
    * Formulario desde el backend
    * */

    this.forma = new FormGroup({

        /*
        *
        * new FormControl(valor por defecto, validaciones),
        * */

        nombre: new FormControl(null, [Validators.required]),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        password2: new FormControl(null, [Validators.required]),
        condiciones: new FormControl(false)
      },

      //Reglas de validacion personalizadas
      // validator: funcion a ajecturar (parametros del formulario que se pasaran)
      {validators: this.sonIguales('password', 'password2')}
    );

    //Llenado por default
    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });

  }


  sonIguales(campo1: string, campo2: string) {


    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null; //enviamos un null que indica que no haga nada
      }

      //Si no se cumple se retornara un true, que implica que no continuara el posteo del form
      return {
        sonIguales: true
      }

    }

  }


  //Funcion que se ejecutara en el submit del formulario de registro
  registrarUsuario() {
    console.log("Value formulario", this.forma.value);
    console.log("Valid formulario", this.forma.valid);
    console.log("Formulario", this.forma);


    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal('Importante', 'Debe de acpetar las condiciones', 'error');
      return;
    }

    //Creando el obtjeto de usuario y le pasamos los valores recogidos del formulario
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe(
      (respuesta) => {
        console.log("Respuesta", respuesta);

        this.router.navigate(['/login']);

        Swal('Excelente', 'Usuario creado correctamente', 'success');

      },
      (error) => {
        console.log("error al crear el usuario", error);

        Swal('Error', error.error.errors.message, 'error');

      }
    )
  }

}
