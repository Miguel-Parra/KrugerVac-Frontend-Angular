import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { dosisPattern, fechaPattern } from 'src/app/shared/validaciones';
import Swal from 'sweetalert2';
import { VacunaService } from '../../service/vacuna.service';

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styles: [
  ]
})
export class VacunaComponent implements OnInit {

  vacunas: any[] = [];

  usuarioConectado = this._authService.usuario;

  vacuna: any = {}

  miFormVacuna: FormGroup = this._formBuilder.group({
    nombre: [1, [Validators.required]],
    fecha_vacunacion: ["", [Validators.required, Validators.pattern(fechaPattern)]],
    dosis: ["", [Validators.required, Validators.pattern(dosisPattern)]],

  })


  get nombreErrorMsg(): string {
    const errors = this.miFormVacuna.get('nombre')?.errors;
    if (errors?.['required']) {
      return "El nombre de la vacuna es requerido";
    }
    return "";
  }

  get fechaVacunacionErrorMsg(): string {
    const errors = this.miFormVacuna.get('fecha_vacunacion')?.errors;
    if (errors?.['required']) {
      return "La fecha de vacunación es obligatoria";
    } else if (errors?.['pattern']) {
      return "La fecha debe tener el siguiente formato: yyyy-mm-dd";
    }
    return "";
  }

  get dosisErrorMsg(): string {
    const errors = this.miFormVacuna.get('dosis')?.errors;
    if (errors?.['required']) {
      return "El número de dosis es requerida";
    } else if (errors?.['pattern']) {
      return "Debe ingresar solo números";
    }

    return "";
  }



  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _vacunaService: VacunaService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
      this._vacunaService.obtenerVacunas()
        .subscribe({
          next: (resp: any) => {
            if (resp.ok === true) {
              this.vacunas = resp.vacunas
            } else {
              Swal.fire({
                text: "Vacunas no encontradas",
                icon: 'warning',
              });
              this._router.navigateByUrl("/empleado")
            }
          }
        })
      return;
  }


  colocarIcono() {
    return this.vacuna.id_vacuna ? "pi pi-user-edit" : "pi pi-user-plus"
  }

  agregarVacuna() {
    if (this.miFormVacuna.invalid) {
      this.miFormVacuna.markAllAsTouched();
      return;
    }

    this._vacunaService.agregarVacuna(this.miFormVacuna.value)
      .subscribe({
        next: resp => {
          if (resp === true) {
            Swal.fire('Éxito', "Vacuna registrada", 'success');
            this._router.navigateByUrl('/empleado');
          } else {
            Swal.fire('Error', resp, 'error')
          }
        }
      })
  }

  regresar() {
    this._router.navigateByUrl('empleado');
  }

  validarCampo(campo: string) {
    return this.miFormVacuna.get(campo)?.invalid &&
      this.miFormVacuna.controls[campo]?.touched
  }

}
