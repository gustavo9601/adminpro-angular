import { Component } from '@angular/core';
import {SettingsService} from "src/app/services/settings/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';


  constructor(public _ajustes:SettingsService){

  }

}
