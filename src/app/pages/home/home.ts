import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
})
export class Home {
  // 1. Capturamos el formulario del HTML para manipularlo desde TS
  @ViewChild('aspiranteForm') myForm!: NgForm;

  aspirante = {
    alias: '',
    email: '',
    nacionalidad: '',
    experiencia: 0
  };

  http: HttpClient = inject(HttpClient);

  notValidField(field: string): boolean {
    // El "?" es importante porque al inicio el formulario puede no estar cargado
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched;
  }

  getFieldError(field: string): string | null {
    if (!this.myForm?.controls[field]) return null;
    
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'email':
          return 'Formato de correo inválido.';
        case 'min':
          return 'La experiencia mínima es 1 año.';
        case 'max':
          return 'Experiencia máxima excedida (50 años).';
        case 'sinEspacios': // <--- Nuestro error personalizado
          return 'El alias no puede contener espacios.';
        default:
          return 'Error desconocido';
      }
    }
    return null;
  }

  // --- VALIDACIÓN PERSONALIZADA (Estilo "notValidPrice") ---
  // Esta función se llamará cada vez que el usuario escriba en el alias
  validarSinEspacios(): void {
    const control = this.myForm?.controls['alias'];
    
    if (!control) return; // Protección por si aún no existe

    const valor = control.value;

    // Si contiene espacios...
    if (valor && valor.toString().indexOf(' ') >= 0) {
      // Mantenemos otros errores si existen (como required), pero añadimos el nuestro
      control.setErrors({ ...control.errors, sinEspacios: true });
    } else {
      // Si el error era SOLO 'sinEspacios', lo quitamos. 
      // Si había otros errores (ej. required), Angular los gestiona automáticamente.
      if (control.hasError('sinEspacios')) {
        delete control.errors?.['sinEspacios'];
        if (Object.keys(control.errors || {}).length === 0) {
            control.setErrors(null);
        }
      }
    }
  }

  // --- ENVÍO ---
  enviarSolicitud() {
    // Forzar validación antes de enviar por seguridad
    if (this.myForm.invalid) {
      this.myForm.form.markAllAsTouched(); // Marca todos como 'touched' para que salgan los mensajes rojos si le da a enviar sin rellenar
      return;
      // Otra forma de marcar todos como 'touched' para que salgan los mensajes rojos si le da a enviar sin rellenar
      // Object.values(this.myForm.controls).forEach(control => {
      //   control.markAsTouched();
      // });
      // return;
    }
    
    console.log('Enviando...', this.aspirante);
    
    this.http.post('http://localhost:3000/aspirantes', this.aspirante)
      .subscribe({
        next: () => {
          alert('Solicitud enviada correctamente.');
          this.myForm.resetForm(
            {alias: '', email: '', nacionalidad: '', experiencia: 0}
          ); // Limpia el formulario y los estados (dirty/touched)
        },
        error: () => alert('Error al conectar con el servidor.')
      });
  }  

}
