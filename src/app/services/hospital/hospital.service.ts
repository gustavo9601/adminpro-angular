import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URL_SERVICIOS} from "src/app/config/config";
import {map} from "rxjs/internal/operators";
import {UsuarioService} from "src/app/services/usuario/usuario.service";

import Swal from 'sweetalert2'
import {Hospital} from "src/app/models/hospital.model";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  public totalHospitales: number = 0;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {
  }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url)
      .pipe(map(
        (respuesta: any) => {

          console.log("Hospitales service", respuesta);
          this.totalHospitales = respuesta.total;
          //Retorno unicamente los hospitales
          return respuesta.hospitales;
        }
      ))
  }


  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).pipe(
      map(
        (respuesta: any) => {
          return respuesta.hospital;
        }
      )
    )
  }


  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map(
        (respuesta: any) => {

          Swal('Hospital borrado', 'Eliminado correctamente', 'success');
          return respuesta.hospital;
        }
      )
    )
  }


  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital' + '?token=' + this._usuarioService.token;
    //Le enviamos el body de los campos en un objeto
    // {nombreQueSeEnviaAlApi: Valor}
    return this.http.post(url, {nombre: nombre}).pipe(
      map(
        (respuesta: any) => {
          return respuesta.hospital;
        }
      )
    )
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(
      map(
        (respuesta: any) => {
          return respuesta.hospitales;
        }
      )
    )
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token='  + this._usuarioService.token;

    return this.http.put(url, hospital).pipe(
      map(
        (respuesta: any) => {

          Swal('Hospital Actualizado', hospital.nombre, 'success');

          return respuesta.hospital;
        }
      )
    )

  }


}
