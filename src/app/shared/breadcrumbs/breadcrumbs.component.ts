import {Component, OnInit} from '@angular/core';
import {Router, ActivationEnd} from "@angular/router";
//Libreria que permite modificar el titulo del metatag
import {Title} from "@angular/platform-browser";
//Libreria que permite modiciar todas las metatags
import {Meta, MetaDefinition} from "@angular/platform-browser";

import {filter, map} from "rxjs/internal/operators";


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  public pagina;

  constructor(private router: Router,
              public title: Title,
              public meta: Meta) {

    this.getDataRoute().subscribe((data: any) => {
      console.log("Evento en breadcrumbs", data);
      this.pagina = data;
      //Modificamos el titulo de cada ruta que se cargue
      this.title.setTitle(data.titulo);


      //Modificamos cada meta tag de cada ruta
      let metaTag: MetaDefinition = {
        name: 'description',
        content: data.titulo
      };
      this.meta.updateTag(metaTag);
    });

  }


  ngOnInit() {


  }


  //Funcion que captura / filtra y retorna solo el objeto de datos
  //Pasado eb el routes
  getDataRoute() {
    return this.router.events
    //Filtramos los parametros inicialmente son pipe(filter())
      .pipe(filter((evento: ActivationEnd) => {
        //Devolvera true or false segun si es una instancia de ActivationEnd
        return evento instanceof ActivationEnd
      }))
      //Filtramos solo el que contenga data u firstchild sea nulo
      .pipe(filter((evento: ActivationEnd) => {
        //Returnara true o false si la propiedad es nula o no
        return evento.snapshot.firstChild === null;
      }))
      //retornamos solo la informacion que necesitamos
      //De esta forma no se tiene que acceder al objeto completo desde el subscribe
      .pipe(map((evento: ActivationEnd) => {
        return evento.snapshot.data;
      }))
  }

}
