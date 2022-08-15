import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CedulaValidatorService } from 'src/app/shared/cedula-validator.service';
import { cedulaPattern, emailPattern, nombreApellidoPattern } from 'src/app/shared/validaciones';
import Swal from 'sweetalert2';
import { Empleado } from '../../interfaces/interfaces';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {


  empleado: any = {}

  miFormCrearEditar: FormGroup = this._formBuilder.group({
    cedula: ["", [Validators.required, Validators.pattern(cedulaPattern)], [this._cedulaValidator]],
    nombres: ["", [Validators.required, Validators.pattern(nombreApellidoPattern)]],
    apellidos: ["", [Validators.required, Validators.pattern(nombreApellidoPattern)]],
    email: ["", [Validators.required, Validators.pattern(emailPattern)]],
  })


  get cedulaErrorMsg(): string {
    const errors = this.miFormCrearEditar.get('cedula')?.errors;
    if (errors?.['required']) {
      return "La cédula es requerida";
    } else if (errors?.['pattern']) {
      return "La cédula debe contenere 10 números";
    } else if (errors?.['cedulaExistente']) {
      return "La cédula ingresada ya se encuentra registrada";
    }
    return "";
  }

  get nombresErrorMsg(): string {
    const errors = this.miFormCrearEditar.get('nombres')?.errors;
    if (errors?.['required']) {
      return "Los nombres son requeridos";
    } else if (errors?.['pattern']) {
      return "Debe ingresar su primer y segundo nombre";
    }
    return "";
  }

  get apellidosErrorMsg(): string {
    const errors = this.miFormCrearEditar.get('email')?.errors;
    if (errors?.['required']) {
      return "Los apellidos son requeridos";
    } else if (errors?.['pattern']) {
      return "Debe ingresar su primer y segundo apellido";
    }

    return "";
  }

  get emailErrorMsg(): string {
    const errors = this.miFormCrearEditar.get('email')?.errors;
    if (errors?.['required']) {
      return "El correo electrónico es requerido";
    } else if (errors?.['pattern']) {
      return "Formato inválido. Ejemplo: test1@test.com";
    }
    return "";
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _cedulaValidator: CedulaValidatorService,
    private _administradorService: AdministradorService
  ) { }

  ngOnInit(): void {
    if (!(this._router.url.includes('editar'))) {
      return;
    };
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this._administradorService.obtenerEmpleado(id)
        })
      )
      .subscribe({
        next: (resp: any) => {
          if (resp.ok === true) {
            const { empleado } = resp;
            if (empleado.length !== 0) {
              this.empleado = {...empleado[0]};
              this.miFormCrearEditar.setValue({
                cedula: empleado[0].cedula,
                nombres: empleado[0].nombres,
                apellidos: empleado[0].apellidos,
                email: empleado[0].email
              })
              this.miFormCrearEditar.get('cedula')?.clearAsyncValidators();
              this.miFormCrearEditar.get('cedula')?.updateValueAndValidity();
            
            } else {
              Swal.fire({
                text: "Usuario no encontrado",
                icon: 'warning',
              });
              this._router.navigateByUrl("/administrador")
            }
          } else {
            Swal.fire('Error', resp, 'error');
            this._router.navigateByUrl("/administrador")
          }
        }
      })
  }


  colocarIcono() {
    return this.empleado.id_empleado ? "pi pi-user-edit" : "pi pi-user-plus"
  }

  agregarEmpleado() {
    if (this.miFormCrearEditar.invalid) {
      this.miFormCrearEditar.markAllAsTouched();
      return;
    }
    if(this.empleado.id_empleado){
      this.actualizarEmpleado();
      return;
    }
  
    let nombres: string = (this.miFormCrearEditar.get('nombres')?.value).toUpperCase();
    let apellidos: string = (this.miFormCrearEditar.get('apellidos')?.value).toUpperCase();
    let cedula: string = this.miFormCrearEditar.get('cedula')?.value;
    let nombresArr = nombres.split(' ');
    const usuario: string = nombresArr[0].charAt(0) + nombresArr[1].charAt(0) + apellidos.split(' ')[0];

    const usuarioARegistrar = {
      cedula,
      nombres,
      apellidos,
      vacunado: false,
      usuario,
      password: cedula,
      email: this.miFormCrearEditar.get('email')?.value,
      estado: true
    };
    this._administradorService.agregarUsuario(usuarioARegistrar)
      .subscribe({
        next: resp => {
          if (resp === true) {
            Swal.fire('Éxito', "Usuario registrado", 'success');
            this._router.navigateByUrl('/administrador');
          } else {
            Swal.fire('Error', resp, 'error')
          }
        }
      })
  }

  regresar() {
    this._router.navigateByUrl('administrador');
  }

  validarCampo(campo: string) {
    return this.miFormCrearEditar.get(campo)?.invalid &&
      this.miFormCrearEditar.controls[campo]?.touched
  }

  actualizarEmpleado(){
    let nombres: string = (this.miFormCrearEditar.get('nombres')?.value).toUpperCase();
    let apellidos: string = (this.miFormCrearEditar.get('apellidos')?.value).toUpperCase();
    let cedula: string = this.miFormCrearEditar.get('cedula')?.value;
    let nombresArr = nombres.split(' ');
    const usuario: string = nombresArr[0].charAt(0) + nombresArr[1].charAt(0) + apellidos.split(' ')[0];

    const usuarioAEditar = {
      cedula,
      nombres,
      apellidos,
      usuario,
      password: cedula,
      email: this.miFormCrearEditar.get('email')?.value
    };

    this._administradorService.actualizarUsuario(usuarioAEditar, this.empleado.id_empleado)
      .subscribe({
        next: resp => {
          if (resp === true) {
            Swal.fire('Éxito', "Usuario editado", 'success');
            this._router.navigateByUrl('/administrador');
          } else {
            Swal.fire('Error', resp, 'error')
          }
        }
      })

  }
}
