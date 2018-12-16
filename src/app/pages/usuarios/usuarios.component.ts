import {Component, OnInit} from '@angular/core';
import {Usuario} from "src/app/models/usuario.model";
import {UsuarioService} from "src/app/services/service.index";
//Swal
import Swal from 'sweetalert2'
import {ModalUploadService} from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})


export class UsuariosComponent implements OnInit {

  //Arreglo de usuarios
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(public _usuarioService: UsuarioService,
              public _modaUploadService: ModalUploadService) {
  }

  ngOnInit() {

    this.cargarUsuarios();

    //Se ejecuta cuando escuhe la emicion de algun emit
    this._modaUploadService.notificacion
      .subscribe((respuesta) => {
      //Refrescara la lista de los usuarios
        this.cargarUsuarios();
      })

  }


  cargarUsuarios() {

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe(
        (respuesta: any) => {


          this.totalRegistros = respuesta.total;
          this.usuarios = respuesta.usuarios;

          console.log("Respuesta cargar usuarios", respuesta);
        }, (error) => {
          console.log("Erro al cargar usuarios", error);
        }
      )

  }


  cambiarDese(valor: number) {

    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde = desde;
    this.cargarUsuarios();


  }


  buscarUsuario(termino: string) {
    console.log("Busqueda input", termino);

    //Controlando que no se pase el termino en nulo
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }


    this._usuarioService.buscarUsuarios(termino)
      .subscribe(
        (respuesta: Usuario[]) => {

          this.usuarios = respuesta;

          console.log("Respuesta busqueda usuarios", respuesta);
        },
        (error) => {
          console.log("Error al consultar usuarios", error);
        }
      );

  }

  borrarUsuario(usuario: Usuario) {
    console.log("Eliminar usuario", usuario);

    //Condicional para que no se pueda eliminar el mismo usuario
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal('No puede borrar usuario', 'No se puede borrar asi mismo', 'error');
      return;
    }

    Swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then(borrar => {
      console.log("Boorar", borrar);

      if (borrar) {

        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe(
            (respuesta) => {
              this.cargarUsuarios(); // recarga la peticion que carga todos los usuarios

              Swal('Usuario borrado', 'El usuario ha sido eliminado correctmanete', 'success');
              return;

            },
            (error) => {
              console.log("Error al eliminar el usuario", error);
            }
          );

      }

    });

  }


  guardarUsuario(usuario) {

    this._usuarioService.actualizarUsuario(usuario)
      .subscribe(
        (respuesta) => {
          Swal('Muy bien', 'usuario actualizado', 'success');
        },
        (error) => {
          console.log("Error al actualizar role de usuariuo", error);
        }
      )

  }

  mostrarModal(id) {
    //Envia la informacion
    this._modaUploadService.mostrarModal('usuarios', id);
  }


}
