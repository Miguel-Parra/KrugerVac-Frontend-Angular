import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  private _usuario: any;

  get usuario() {
    return { ...this._usuario }
  }

  constructor(
    private _httpClient: HttpClient
  ) { }


  loginService(usuario: string, password: string, rol: number) {
    const url = this.baseUrl + '/auth';
    const body = {
      usuario,
      password,
      rol
    }
    return this._httpClient.post(url, body)
      .pipe(
        tap((datos: any) => {
          if (datos.ok) {
            localStorage.setItem('token', datos.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(error => of(error.error.msg))
      )
  }

  validarToken(path: string): Observable<boolean> {
    const url = this.baseUrl + '/auth/validar_token';
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this._httpClient.get(url, { headers: headers })
      .pipe(
        map((respuesta: any) => {
          const { ok, resp, token } = respuesta;
          const rol = Number(resp.rol!);
          this._usuario = {
            informacionCompleta: resp,
            usuario: resp.usuario!,
            id_empleado: resp.id_empleado!,
            rol: rol
          }
          if (path === "administrador" && rol === 1) {
            return ok
          } else if (path === "empleado" && rol === 2) {
            return ok
          } 
            return false
          
        }),
        catchError(error => {
          return of(false)
        })

      )
  }

  salir(){
    localStorage.removeItem('token');
  }
}
