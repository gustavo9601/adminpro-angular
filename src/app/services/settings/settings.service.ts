import {Injectable, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/platform-browser";
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //Propiedas por defecto
  public ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) {
this.cargarAjustes();
  }


  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    } else {
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    }

    //Ejecutamos la funcion que cambiara el color
    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(color){
    let url = 'assets/css/colors/' + color + '.css';
    //Utilizando el Inject Document, para modificar el link y el path de los estilos
    this._document.getElementById('tema').setAttribute('href', url);

    //Utilizando el servicio para persistir las configuracione snen el local storage
    this.ajustes.tema = color;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

}


interface Ajustes {
  temaUrl: string,
  tema: string
}
