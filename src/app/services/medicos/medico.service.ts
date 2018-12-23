import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {URL_SERVICIOS} from "src/app/config/config";
import {map} from "rxjs/internal/operators";
import {UsuarioService} from "src/app/services/usuario/usuario.service";


import Swal from 'sweetalert2'
import {Medico} from "src/app/models/medico.model";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {
  }


  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url).pipe(
      map(
        (respuesta: any) => {

          this.totalMedicos = respuesta.total;

          return respuesta.medicos;
        }
      )
    )
  }


  buscarMedicos(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).pipe(
      map(
        (respuesta: any) => {
          return respuesta.medicos;
        }
      )
    )

  }


  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map((respuesta) => {

          Swal('Medico Borrado', 'se borro el medico', 'success');

          return respuesta;
        }
      )
    )
  }


  guardarMedico(medico: Medico) {


    let url = URL_SERVICIOS + '/medico';
    //Si existe el id, significa que esta actualizando


    if (medico._id) {

      url += '/' + medico._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, medico).pipe(
        map(
          (respuesta) => {
            Swal('Medico actualizado', medico.nombre, 'success');
            return respuesta;
          }
        )
      )


    } else {

      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico).pipe(
        map(
          (respuesta: any) => {

            Swal('Medico creado', medico.nombre, 'success');

            return respuesta.medico;
          }
        )
      )
    }

  }


  cargarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
      .pipe(
        map(
          (respuesta: any) => {
            return respuesta;
          }
        )
      )
  }

}
