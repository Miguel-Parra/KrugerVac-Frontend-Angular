import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cedulaPattern, fechaPattern } from 'src/app/shared/validaciones';
import { Vacuna } from '../../interfaces/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VacunaService } from '../../service/vacuna.service';
import { EmpleadoService } from '../../service/empleado.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
    `
    #sidebar {
    height: 100%;
    min-height: 100vh ;
    min-width: 180px
}
    `
  ]
})
export class PrincipalComponent implements OnInit {

  usuarioConectado = this._authService.usuario;

  get fechaNacimientoErrorMsg(): string {
    const errors = this.miFormInfoAdicional.get('fecha_nacimiento')?.errors;
    if (errors?.['required']) {
      return "La fecha es requerida";
    } else if (errors?.['pattern']) {
      return "EL formato debe ser: yyyy-mm-dd";
    }
    return "";
  }

  get direccionDomicilioErrorMsg(): string {
    const errors = this.miFormInfoAdicional.get('direccion_domicilio')?.errors;
    if (errors?.['required']) {
      return "La dirección es requerida";
    } else if (errors?.['minlength']) {
      return "La dirección debe contener al menos 15 caracteres";
    }
    return "";
  }

  get telefonoMovilErrorMsg(): string {
    const errors = this.miFormInfoAdicional.get('telefono_movil')?.errors;
    if (errors?.['required']) {
      return "El teléfono es requerido";
    } else if (errors?.['pattern']) {
      return "El teléfono movil debe contener 10 números";
    }
    return "";
  }
  get vacunadoErrorMsg(): string {
    const errors = this.miFormInfoAdicional.get('vacunado')?.errors;
    if (errors?.['required']) {
      return "Estado requerido";
    }
    return "";
  }


  // miFormInfoAdicional: FormGroup = this._formBuilder.group({
  //   fecha_nacimiento: ['1993-12-22', [Validators.required, Validators.pattern(fechaPattern)]],
  //   direccion_domicilio: ["hhhjjj", [Validators.required, Validators.minLength(15)]],
  //   telefono_movil: ['0998887777', [Validators.required, Validators.pattern(cedulaPattern)]],
  //   vacunado: ["false", [Validators.required]],

  // })
  miFormInfoAdicional: FormGroup = this._formBuilder.group({
    fecha_nacimiento: [(this.usuarioConectado.informacionCompleta.fecha_nacimiento === null? "": String(this.usuarioConectado.informacionCompleta.fecha_nacimiento).substring(0, 10)), [Validators.required, Validators.pattern(fechaPattern)]],
    direccion_domicilio: [this.usuarioConectado.informacionCompleta.direccion_domicilio, [Validators.required, Validators.minLength(15)]],
    telefono_movil: [this.usuarioConectado.informacionCompleta.telefono_movil, [Validators.required, Validators.pattern(cedulaPattern)]],
    vacunado: [String(this.usuarioConectado.informacionCompleta.vacunado), [Validators.required]],

  })

  vacunas: Vacuna[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _vacunaService: VacunaService,
    private _empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this._vacunaService.obtenerVacunasUsuario(this.usuarioConectado.id_empleado)
      .subscribe({
        next: (resp: any) => {
          if (resp.ok === true) {
            this.vacunas = resp.vacunas
          } else {
            Swal.fire({
              text: "El usaurio no tiene vacunas registradas",
              icon: 'warning',
            });

          }
        }
      })
    

  }


  salir(
  ) {
    this._authService.salir();
    this._router.navigateByUrl('/auth')
  }


  actualizarInformacion() {
    if (this.miFormInfoAdicional.invalid) {
      this.miFormInfoAdicional.markAllAsTouched();
      return;
    }

    this._empleadoService.editarInfoAdicional(this.miFormInfoAdicional.value, this.usuarioConectado.id_empleado)
      .subscribe({
        next: respuesta => {
          const { ok, resp } = respuesta;
          if (ok === true) {
        
            Swal.fire('Éxito', "Datos actualizados", 'success');
            this.usuarioConectado = {
              informacionCompleta: resp,
              usuario: resp.usuario!,
              id_empleado: resp.id_empleado!,
              rol: resp.rol
            }

          } else {
            Swal.fire('Error', resp, 'error')
          }
        }
      })

  }

  validarCampo(campo: string) {
    return this.miFormInfoAdicional.get(campo)?.invalid &&
      this.miFormInfoAdicional.controls[campo]?.touched
  }

  verificarVacunado(estado: string) {
    this.miFormInfoAdicional.get('vacunado')?.setValue(estado);
    if (estado === "true") {
      if (this.vacunas.length === 0) {
        this.agregarVacuna();
      }

    } else {
      if (this.vacunas.length !== 0) {
        Swal.fire('Error', "El usuario tiene registradas vacunas, no puede cambiar el estado a 'no vacunado'", 'error');
        this.miFormInfoAdicional.get('vacunado')?.setValue("true");
      }
    }

  }

  agregarVacuna() {
    this._router.navigateByUrl('empleado/agregarVacuna')
  }
}
