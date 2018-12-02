import { Component, OnInit } from '@angular/core';


declare function init_plugins(); //funcion que esta en el customm.js la declaramos


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})



export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
