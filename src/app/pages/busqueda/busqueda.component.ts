import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {URL_SERVICIOS} from "src/app/config/config";
import {Usuario} from "src/app/models/usuario.model";
import {Hospital} from "src/app/models/hospital.model";
import {Medico} from "src/app/models/medico.model";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {


  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];


  constructor(public _activatedRoute: ActivatedRoute,
              public _http: HttpClient) {

    this._activatedRoute.params
      .subscribe(
        (parametros) => {
          //console.log("Parametros de busqueda", parametros['termino']);

          //Ejecutando la funcion  y pasando por parametro lo que venga en la url
          this.buscar(parametros['termino']);

        }
      )

  }


  buscar(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this._http.get(url)
      .subscribe(
        (respuesta: any) => {
          console.log("Respuesta de busqueda en todas las colecciones", respuesta);

          this.usuarios = respuesta.usuarios;

          console.log(this.usuarios);

          this.medicos = respuesta.medicos;
          this.hospitales = respuesta.hospitales;

        }
      )


  }


  ngOnInit() {
  }

}
