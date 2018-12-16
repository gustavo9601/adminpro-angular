import {Injectable} from '@angular/core';
import {URL_SERVICIOS} from "src/app/config/config";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {Usuario} from "src/app/models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(public http: HttpClient,
              public router: Router) {
  }


  subirArchivo(archivo: File, tipo: string, id: string) {


    return new Promise((resolve, reject) => {

      let formData = new FormData();

      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function () {
        //4 es el estado de terminado
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("Imagen subida");
            resolve(xhr.response);
          } else {
            console.log("Fallo la subida del archivo");
            reject(xhr.response);
          }
        }
      }

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });


  }


  subirArchivo2(usuario: Usuario, tipo: string, id: string) {


    console.log("usario a enviar a la peticion", usuario);



    let url = URL_SERVICIOS + '/upload2/' + tipo + '/' + id;

   return  this.http.put(url, usuario).pipe(
      map((respuesta) => {

        console.log("Repsuesta al subir archivo", respuesta)

        return respuesta;
      })
    )


  }


}
