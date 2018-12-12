import {Pipe, PipeTransform} from '@angular/core';
import {URL_SERVICIOS} from "src/app/config/config";

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {


    let url = URL_SERVICIOS + '/img/';


    if (!img) {
      return url + '/usuarios/xxx';
    }


    //verificacion si encuntra en la palbra https,
    //signigica que es una imagen de google
    if (img.indexOf('https') >= 0) {
      return img;
    }


    switch (tipo) {
      case 'usuario':
        url += '/usuario/' + img;

        break;
      case 'medico':

        url += '/medico/' + img;
        break;

      case 'hospital':

        url += '/hospital/' + img;
        break;


      default:
        url += '/usuarios/xxx';
        console.log("El tipo de la imagen no existe")
    }

    return url;
  }

}
