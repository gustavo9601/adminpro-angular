import {NgModule} from '@angular/core';
import {ImagenPipe} from "src/app/pipes/imagen.pipe";


@NgModule({
  imports: [],
  declarations: [
    ImagenPipe
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule {
}
