import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Empleado } from '../../interfaces/interfaces';
import { AdministradorService } from '../../services/administrador.service';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
  ]
})
export class PrincipalComponent implements OnInit {

  constructor(
    private _router: Router,
    private _administradorService: AdministradorService,
    private _authService: AuthService
  ) { }

  usuarioConectado = this._authService.usuario;

  empleados: Empleado[] = [];

  ngOnInit(): void {
    this._administradorService.obtenerUsuarios()
      .subscribe({
        next: respuesta => {
          this.empleados = respuesta.usuarios
        }

      })
  }


  eliminar(empleado: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡No podrá revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._administradorService.eliminarUsuario(empleado.id_empleado!)
          .subscribe({
            next: resp => {
              if (resp === true) {
                const indice = this.empleados.indexOf(empleado)
                const empleadoEliminado = this.empleados.splice(indice, 1);
                Swal.fire(
                  'Eliminado!',
                  `Empleado ${empleadoEliminado[0].nombres} ${empleadoEliminado[0].apellidos} eliminado`,
                  'success'
                )
              } else {
                Swal.fire('Error', resp, 'error')
              }
            }

          })

      }
    })

  }

  editar(empleado: any) {
    this._router.navigateByUrl(`/administrador/editar/${empleado.id_empleado}`)

  }

  agregarEmpleado() {
    this._router.navigateByUrl('/administrador/agregar')
  }

  informacionEmpleado(empleado: Empleado) {
    Swal.fire({
      text: "Esta funcionalidad se implementará a fúturo",
      icon: 'warning',
    });
  }

  salir(){
    this._router.navigateByUrl('/auth');
    this._authService.salir();
  }

 
}
