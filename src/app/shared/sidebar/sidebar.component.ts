import {Component, OnInit} from '@angular/core';
import {SidebarService} from "src/app/services/service.index";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

//Servicios

export class SidebarComponent implements OnInit {



  constructor(public _sidebar: SidebarService) {
    console.log(this._sidebar);
  }

  ngOnInit() {
  }

}
