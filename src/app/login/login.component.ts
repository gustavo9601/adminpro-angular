import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

declare function init_plugins(); //funcion que esta en el customm.js la declaramos

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['/login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit() {

    init_plugins();

  }

  ingresar() {
    console.log("Ingresando...");

    this.router.navigate(['/dashboard']);

  }

}
