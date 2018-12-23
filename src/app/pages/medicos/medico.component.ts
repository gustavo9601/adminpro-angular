import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Hospital} from "src/app/models/hospital.model";
import {MedicoService} from "src/app/services/service.index";
import {HospitalService} from "src/app/services/service.index";
import {Medico} from "src/app/models/medico.model";
import {Router, ActivatedRoute} from "@angular/router";
import {ModalUploadService} from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();
  hospital: Hospital = new Hospital('');

  constructor(public _medicoService: MedicoService,
              public _hospitalService: HospitalService,
              public _router: Router,
              public _activatedRoute: ActivatedRoute,
              public _modalUploadService: ModalUploadService) {


    this._activatedRoute.params.subscribe(
      (parametros) => {

        //Capturando el parametro id pasado por la url
        let id = parametros['id'];

        if (id != 'nuevo') {
          this.cargarMedico(id);
        }

      }
    )

  }

  ngOnInit() {

    this._hospitalService.cargarHospitales()
      .subscribe(
        (respuesta) => {
          this.hospitales = respuesta;
        }
      )


    this._modalUploadService.notificacion
      .subscribe(
        (respuesta) => {
          console.log("Respuesta de notificacion del modal en el componente de medico", respuesta);
        }
      )


  }


  guardarMedico(f: NgForm) {

    console.log("Formulario", f);
    console.log("Valores formulario", f.value);


    if (f.invalid) {
      return;

    }

    this._medicoService.guardarMedico(this.medico)
      .subscribe(
        (respuesta) => {
          console.log("espuesta creacion medico", respuesta);


          this.medico._id = respuesta;

          this._router.navigate(['/medico', respuesta._id]);

        }
      )


  }


  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
      .subscribe(
        (respuesta) => {

          console.log("Informacion de medico en pantalla de edicion", respuesta);

          this.medico = respuesta.medico;
          this.medico.hospital = respuesta.medico.hospital._id;
          this.cambioHospital(this.medico.hospital); // le pasamos el id del hospital
        },
        (error) => {

        }
      )
  }


  cambioHospital(valor) {

    this._hospitalService.obtenerHospital(valor)
      .subscribe(
        (respuesta) => {
          console.log("Respuesta cambioHospital", respuesta);

          this.hospital = respuesta;
        }
      )
  }


  cambiarFoto() {

    this._modalUploadService.mostrarModal('medicos', this.medico._id);


  }

}
