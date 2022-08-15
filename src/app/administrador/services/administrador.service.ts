import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private _httpClient: HttpClient
  ) { }

  obtenerUsuarios() {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    const url = this.baseUrl + `/usuarios`;
    return this._httpClient.get<any>(url, { headers: headers })
      .pipe(
        catchError(error => of(error.error.msg))

      )
  }

  agregarUsuario(usuario: any) {
    const url = this.baseUrl + '/usuarios/agregarUsuario';
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    const body = {
      usuario
    }
    return this._httpClient.post<any>(url, body, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(error => of(error.error.msg))

      )
  }

  eliminarUsuario(idUsuario: number) {
    const url = this.baseUrl + `/usuarios/eliminar/${idUsuario}`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this._httpClient.get<any>(url, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(error => of(error.error.msg))
      )
  }

  obtenerEmpleado(idEmpleado: number) {
    const url = this.baseUrl + `/usuarios/obtener/${idEmpleado}`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this._httpClient.get<any>(url, { headers })
      .pipe(
        catchError(error => of(error.error.msg))
      )
  }

  actualizarUsuario(usuario: any, idEmpleado: number) {
    const url = this.baseUrl + `/usuarios/actualizar/${idEmpleado}`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    const body = {
      usuario
    }
    return this._httpClient.post<any>(url, body, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(error => of(error.error.msg))

      )
  }

}
