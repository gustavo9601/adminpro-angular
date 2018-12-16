import {Component, OnInit} from '@angular/core';
import {Usuario} from "src/app/models/usuario.model";
import {UsuarioService} from "src/app/services/usuario/usuario.service";

//Swal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {

    this.usuario = this._usuarioService.usuario;

  }

  ngOnInit() {

  }

  actualizarUsuario(f) {
    console.log("Formulario", f);
    console.log("Formulario Value", f.value);


    this.usuario.nombre = f.value.nombre;
    if (!this.usuario.google) {

      this.usuario.email = f.value.email;

    }


    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe((respuesta) => {
        console.log(respuesta);

        Swal('Usuario actualizado correctamente', this.usuario.nombre, 'success');

      }, (error) => {
        console.log("Error al actualizar usuario", error);
      });

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


  cambiarImagen() {

    console.log(this.imagenTemp);

    this.usuario.img = this.imagenTemp;

    this._usuarioService.cambiarImagen(this.usuario, this.usuario._id);
  }

}
