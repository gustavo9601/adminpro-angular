import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs/index";
import {promise} from "selenium-webdriver";
import map = promise.map;
import {retry} from "rxjs/internal/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {



  public subcripcion: Subscription;

  constructor() {

    //Suscribiendome y asignadole a una variable de tipo subcripcion
    // de esta forma se puede controlar el inicio y el fin de la subcripcion
     this.subcripcion = this.regresaObservable()
        .subscribe(
          (respuesta) => {
            console.log('Subscripcion', respuesta);
          }, (error) => {
            console.log("Error en el observador obs", error);
          }, () => { //el complete no recibe parametros
            console.log("El Observador termino!");
          }
        );


  }

  ngOnInit() {
  }

//Funcion que se ejecutara al cambiar de interfaz
  ngOnDestroy(){
    console.log("Destruyendo el rxjs.component");
    this.subcripcion.unsubscribe();  //Desucribimos el obserbable y se destruira
  }
  regresaObservable(){

    let obs = new Observable(
      observer => {

        let contador = 0;

        let intervalo = setInterval(() => {


          contador += 1;
          observer.next(contador); // Emite una respuesta


          if (contador === 50) {
            clearInterval(intervalo);
            observer.error('Error simulado en el observador');
          }


          if (contador === 100) {
            clearInterval(intervalo);
            observer.complete();  //le indicamos que el observador se completo
          }


        }, 1000);
      }
    ).pipe(retry(2));     //.pipe(retry(2)) => le indicamos que aunque halla error por lo menos lo intente N cantidad de veces
                                // si la respuesta no es next o sucess, finalimente retornar el erro

    return obs;
  }

}
