import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../Services/authService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SwalComponent],
  templateUrl: './login.html',
})
export class Login {
  
  private service = inject(AuthService);
  private fb : FormBuilder = inject(FormBuilder);
  private router = inject(Router);

  public formLogin : FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  })

  isValidField(field : string){
    return this.formLogin.controls[field].errors && this.formLogin.controls[field].touched;
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

  @ViewChild('swalSuccess') swalSuccess !: SwalComponent;
  @ViewChild('swalError') swalError !: SwalComponent;


  login(){
    if(!this.formLogin.valid){
      this.swalError.fire();
      return;
    }

    this.service.login(this.formLogin.value.email, this.formLogin.value.password)
    .subscribe({
      next: response => {
        this.router.navigate(['/'])
        this.swalSuccess.fire();
      },
      error: () => {
        this.swalError.fire();
      }
    })
  }
}
