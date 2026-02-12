import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Services } from '../Services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  
  private service = inject(Services);
  private fb : FormBuilder = inject(FormBuilder);
  private router = inject(Router);

  public formLogin : FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  })

  isValidField(field : string){
    return this.formLogin.controls[field]?.errors && this.formLogin.controls[field]?.touched;
  }

  getFieldError(field: string){
    if(!this.formLogin.controls[field]) return null

    const errors = this.formLogin.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      switch(key){
        case "required":
            return "Este campo es requerido"
        case "email":
            return "El correo no es válido"
        default: 
          return null
      }
    }
    return null
  }

  login(){
    if(!this.formLogin.valid){
      this.formLogin.markAllAsTouched();
      return;
    }
    const {email, password} = this.formLogin.value;
    this.service.login(email, password).subscribe({
      next : response => {
        this.router.navigateByUrl("/")
      }
    })

  }
}
