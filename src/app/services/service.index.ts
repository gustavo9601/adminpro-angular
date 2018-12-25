/*
* Exportamos todos los servicios, para unificar todas las importaciones
* */


export {VerificaTokenGuard} from "src/app/services/guards/verifica-token.guard";

export {AdminGuard} from "src/app/services/guards/admin.guard";
export {MedicoService} from "src/app/services/medicos/medico.service";
export {HospitalService} from "src/app/services/hospital/hospital.service";
export {SubirArchivoService} from "src/app/services/subir-archivo/subir-archivo.service";
export {LoginGuardGuard} from "src/app/services/guards/login-guard.guard";
export {SettingsService} from "src/app/services/settings/settings.service";
export {SharedService} from "src/app/services/shared/shared.service";
export {SidebarService} from "src/app/services/shared/sidebar.service";
export {UsuarioService} from "src/app/services/usuario/usuario.service";
