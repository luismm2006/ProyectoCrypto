import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aspirant, Mission } from '../auth/interfaces/interface';
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

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
}