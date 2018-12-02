import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {


  @Input() data_input;
  @Input() labels_input;
  @Input() chartType_input;

  constructor() { }

  ngOnInit() {
  }

}
