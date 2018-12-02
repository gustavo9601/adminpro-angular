import {Component, OnInit, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/platform-browser";

//Servicios
import {SettingsService} from "src/app/services/service.index";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) {
  }

  ngOnInit() {

    this.cargarCheck();

  }

  cambiarColor(color, elemento) {
    console.log("Color clikeado", color, elemento);

    this._ajustes.aplicarTema(color);

    //Marcando el check
    this.aplicarCheck(elemento);
  }


  aplicarCheck(elemento) {

    let selectores:any = document.getElementsByClassName('selector'); //Arreglo de selectores

    //Quitamos todas las clases working a todos los elelemntos
    for (let ref of selectores) {
      ref.classList.remove('working');
    }

    elemento.classList.add('working');
  }

  cargarCheck(){
    let selectores:any = document.getElementsByClassName('selector'); //Arreglo de selectores

    let tema = this._ajustes.ajustes.tema; //Cargo el tema o color que devuelva el servicio

    //Quitamos todas las clases working a todos los elelemntos
    for (let ref of selectores) {
      if(ref.getAttribute('data-theme') == tema){
        ref.classList.add('working');
        break; //se rompera el ciclo si encuentra la conincidencia
      }
    }

  }



}
