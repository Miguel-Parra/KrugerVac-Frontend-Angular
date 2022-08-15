import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CedulaValidatorService implements AsyncValidator {
baseUrl:string = environment.baseUrl;

  constructor(private _httpClient: HttpClient) { }
  
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    const cedula = `${control.value}`;
    const url = this.baseUrl + `/usuarios?cedula=${cedula}`;
    return this._httpClient.get<any>(url, { headers: headers })
    .pipe(
      map(respuesta => {

        if(respuesta.usuarios.length !== 0){
          return {
            cedulaExistente: true
          }
        }
        return null;
      })
    );
  }


}

