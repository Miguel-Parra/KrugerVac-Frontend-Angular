import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  baseUrl = environment.baseUrl;

  constructor(
    private _httpClient: HttpClient
  ) { }

  editarInfoAdicional(informacion: any, idEmpleado: number) {

    const url = this.baseUrl + `/usuarios/actualizarAdicional/${idEmpleado}`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    const body = {
      informacion
    }
    return this._httpClient.post<any>(url, body, { headers })
      .pipe(
        catchError(error => of(error.error.msg))

      )
  }
}
