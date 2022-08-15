import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  roles: Rol[] = [
    { id_rol: 1, nombre_rol: 'Administrador' },
    { id_rol: 2, nombre_rol: 'Empleado' }
  ]

  miFormLogin: FormGroup = this._formBuilder.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rol: [this.roles[1].id_rol, [Validators.required]],
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
  ) { }

  login() {
    if (this.miFormLogin.invalid) {
      this.miFormLogin.markAllAsTouched();
      return;
    }
    const { usuario, password, rol } = this.miFormLogin.value;
    this._authService.loginService(usuario, password, rol)
      .subscribe({
        next: resp => {
          if (resp === true) {
            if (Number(rol) === 1) {
              this._router.navigateByUrl("/administrador")
            } else if (Number(rol) == 2) {
              this._router.navigateByUrl('/empleado')
            }
          } else {
            Swal.fire('Error', resp, 'error')
          }
        }
      })
  }

  validarCampo(campo: string) {
    return this.miFormLogin.get(campo)?.invalid &&
      this.miFormLogin.controls[campo]?.touched
  }

}
