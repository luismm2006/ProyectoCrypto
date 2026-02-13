import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aspirant, Mission } from '../auth/interfaces/interface';
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { delay, map, Observable, of, switchMap, timer } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  

  codigoValidator(control : AbstractControl) : ValidationErrors | null{
      const value = control.value;

      if(!value) return null;

      const regex = /^[A-Z]{3}-\d{3}$/;

      return regex.test(value) ? null : {codigoValido : true};

  }

  cantBe(palabra : string){
    return (control : FormControl) : ValidationErrors | null => {
      const value = control.value.trim().toLowerCase();

      if(value === palabra.toLowerCase()){
        return {
          palabraProhibida: {
            value: palabra
          }
        }
      }
      return null;
    }
  }

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/misiones';
  // PASO 3: Validador Asíncrono
  // VALIDACIÓN ASÍNCRONA REAL
  // Usamos un getter o una función que devuelve el validador para poder inyectar dependencias
  validateNameMission(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const name = control.value;
    // Si el campo está vacío, no validamos nada (dejamos que el 'required'actúe)
    if (!name) {
      return new Observable(observer => observer.next(null));
      // Ojo: Angular espera un Observable que se complete
    }
    // RxJS Pipe Mágico:
    // 1. timer(500): Espera 500ms. Si el usuario escribe antes, se reinicia.
    // 2. switchMap: Si había una petición anterior pendiente, la cancela y lanza la nueva.
    return timer(500)
      .pipe(
        switchMap(() => {
          return this.http.post<{ isAvailable: boolean }>(this.apiUrl, { name });
      }),
      map(response => {
      // Si isAvailable es true -> null (Sin errores)
      // Si isAvailable es false -> { emailTaken: true } (Error)
        return response.isAvailable ? null : { nameTaken: true };
        })
      );
    };
  }
}