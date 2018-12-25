import {Component, OnInit} from '@angular/core';
import {Hospital} from "src/app/models/hospital.model";
import {HospitalService} from "src/app/services/service.index";
//Swal
import Swal from 'sweetalert2'
import {ModalUploadService} from "src/app/components/modal-upload/modal-upload.service";


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {


  hospitales: Hospital[] = [];

  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) {

  }

  ngOnInit() {

    //Cargando los hospitales
    this.cargarHospitales();

    //Me suscribo a la notificacion para escuchar cambios sobre lo que emita en el modal
    this._modalUploadService.notificacion.subscribe(
      () => {
        this.cargarHospitales();
      }
    );

  }

  crearHospital() {
    Swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si crearlo'
    }).then((valor: any) => {

      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor.value)
        .subscribe(
          (respuesta) => {
            console.log("Respuesta crear hospital", respuesta);

            Swal('Creacion exitosa', 'Se creo correctamente', 'success');
            this.cargarHospitales();
          }
        )
    })
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
      .subscribe(
        (respuesta) => {
          this.hospitales = respuesta;
        }
      )
  }

  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital)
      .subscribe();  //se actualizara la informacion

  }

  borrarHospital(hospital: Hospital) {

    this._hospitalService.borrarHospital(hospital._id)
      .subscribe(
        (respuesta) => {

          //Recargamos la lista de hospitales
          this.cargarHospitales();
        },
        (error) => {
          Swal('Error al eliminar', 'No se logro eliminar :' + error, 'error');
        }
      );


  }


  buscarUsuario(termino: string) {

    //Verificando que el termino escrito sea valido
    if (termino.length <= 0) {

      this.cargarHospitales();
      return;

    }

    this._hospitalService.buscarHospital(termino)
      .subscribe(
        (respuesta) => {
          this.hospitales = respuesta;
        }
      )
  }


  actualizarImagen(hospital: Hospital) {

    this._modalUploadService.mostrarModal('hospitales', hospital._id);

  }

}
