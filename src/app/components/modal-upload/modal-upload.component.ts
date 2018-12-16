import {Component, OnInit} from '@angular/core';
import {Usuario} from "src/app/models/usuario.model";

//Swal
import Swal from 'sweetalert2'
import {SubirArchivoService} from "src/app/services/subir-archivo/subir-archivo.service";
import {ModalUploadService} from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService) {


  }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }



  subirImagen() {
    console.log("Subiendo imagen");

    //De esta forma comunicamos dos archivos de servicios
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo,this._modalUploadService.id )
      .then(
        (respuesta) => {


          console.log(respuesta);
          //Si se subio correctamente la imagen
          //Se emitira el evento para que los demas componentes que esten escuchando el emit lo reciban

          this._modalUploadService.notificacion.emit(respuesta);  //Emitimos la respuesta
          this.cerrarModal();

        }
      )
      .catch(
        (error) => {
          console.log("Error en la carga");
        }
      )

  }

  seleccionImage($event) {
    console.log("Archivo seleccionado", $event);
    console.log("Archivo seleccionado Files[0]", $event.target.files[0]);

    let archivo = $event.target.files[0];
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    //verificacion que sea una imagen
    if (archivo.type.indexOf('image') < 0) {
      Swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    //Colocando temporalmente la imagen seleccionada
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;


    this.imagenSubir = archivo;

  }

}
