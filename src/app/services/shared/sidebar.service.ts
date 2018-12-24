import {Injectable} from '@angular/core';
import {UsuarioService} from "src/app/services/usuario/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  public menu: any[] = [];

  /*menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
        {titulo: 'Graficas', url: '/graficas1'},
        {titulo: 'Promesas', url: '/promesas'},
        {titulo: 'Rxjs', url: '/rxjs'}
      ]
    },
    {
      titulo: 'Mantenimiento de usuario',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Hospitales', url: '/hospitales'},
        {titulo: 'Medicos', url: '/medicos'},
      ]
    }
  ];*/
  constructor(public _usuarioService: UsuarioService) {

  }


  cargarMenu() {
    //Conectamos al servicio de usuario, que ya cuenta con la variable de menu seteada
    // y la cargamos al servicio
    this.menu = this._usuarioService.menu;
  }

}
