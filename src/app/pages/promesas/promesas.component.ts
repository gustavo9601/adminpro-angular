import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  public numero:Number;


  constructor() {

    //Costuryendo las funciones que se ejecutaran cuando resolve o reject la variable promesa
    this.contarTres()
      .then(
        () => {
          console.log("Termino correctamente la promesa")
        })
      .catch
      (
        (error) => {
          console.log("Error en la promesa", error);
        });
  }

  ngOnInit() {
  }


  contarTres() {
    //(resolve => ok) (reject => error/fail)
    let promesa = new Promise((resolve, reject) => {

      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;

        console.log(contador);
        if (contador === 3) {
          resolve();
        }

        if (contador === 5) {
          reject('Simplemente es un error');
          clearInterval(intervalo); //detenemos el intervalor
        }


        this.numero = contador;

      }, 1000);
    });

    return promesa;
  }


}
