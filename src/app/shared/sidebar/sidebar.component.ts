import {Component, OnInit} from '@angular/core';
import {SidebarService} from "src/app/services/service.index";
import {UsuarioService} from "src/app/services/service.index";
import {Usuario} from "src/app/models/usuario.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

//Servicios

export class SidebarComponent implements OnInit {

  public usuario:Usuario;


  constructor(public _sidebar: SidebarService,
              public _usuarioService:UsuarioService) {
    console.log(this._sidebar);
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}
