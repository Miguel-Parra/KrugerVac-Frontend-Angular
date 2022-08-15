import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {

private baseUrl: string = environment.baseUrl;

  constructor(
    private _httpClient: HttpClient
  ) { }

  obtenerVacunas() {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    const url = this.baseUrl + `/vacunas`;
    return this._httpClient.get<any>(url, { headers: headers })
      .pipe(
        catchError(error => of(error.error.msg))

      )
  }

  agregarVacuna(vacuna: any) {
    const url = this.baseUrl + '/vacunas/agregar';
    const body = {
      vacuna
    }
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this._httpClient.post<any>(url, body, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(error => of(error.error.msg))

      )
  }

  obtenerVacunasUsuario(idEmpleado: number) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    const url = this.baseUrl + `/vacunas/usuario/${idEmpleado}`;
    return this._httpClient.get<any>(url, { headers: headers })
      .pipe(
        catchError(error => of(error.error.msg))
      )
  }

  }