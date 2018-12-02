import {Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {


  /*
  * ViewChile -> funciona para seleccionar por id elemtos del dom
  * */
  @ViewChild('txtProgress') txtProgress:ElementRef // Pasamos el ID de angular que esta en el template del elemento


  //@Input('nombre') progreso: number = 50;  //le colocamos entre los parentisis otro nombre que se recibira
  @Input() progreso: number = 50;  // Le definimos por default un valor si no se recibe ningUNO
  @Input() leyenda: string = 'Leyenda';

  //Variable a emmitirla al padre
  @Output() progresoEmitido: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  cambiarValor(valor) {
    if (this.progreso >= 100 && this.progreso > 100) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && this.progreso < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    this.progresoEmitido.emit(this.progreso);

  }


  onChange(event:number){
    console.log("Nuevo valor", event);

    console.log(this.txtProgress);

    if(event >= 100){
      this.progreso = 100;
    }else if(event <= 0){
      this.progreso = 0;
    }else{
      this.progreso = event;
    }


    //Modicamos el valor del elento de viwchild donde se este ejecutando el evento
    this.txtProgress.nativeElement.value=this.progreso;


    this.progresoEmitido.emit(this.progreso);

    //.focus()  enfocara al input
    this.txtProgress.nativeElement.focus();

  }
}
