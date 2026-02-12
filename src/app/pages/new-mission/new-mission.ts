import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-mission',
  imports: [ReactiveFormsModule],
  templateUrl: './new-mission.html',
})
export class NewMission {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  // Definición del Formulario Reactivo
  misionForm: FormGroup = this.fb.group({
    // Campo: [ValorInicial, [Validadores Síncronos], [Validadores Asíncronos]]

    codigo: ['', [
      Validators.required,
    ]],

    titulo: ['', [
      Validators.required
    ]],

    secreto: ['Bajo', [Validators.required]], // Valor por defecto 'Bajo'

    agenteId: ['', [Validators.required]], // Lo mapeamos a 'agenteId' para la API

    descripcion: ['', [
      Validators.required,
      Validators.minLength(10)
    ]]
  });

  // --- TUS FUNCIONES AUXILIARES (Adaptadas a Reactive) ---

  notValidField(field: string): boolean {
    return !!(this.misionForm.get(field)?.invalid && this.misionForm.get(field)?.touched);
  }

  getFieldError(field: string): string | null {
    const control = this.misionForm.get(field);
    if (!control || !control.errors) return null;

    const errors = control.errors;

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'codigoSecreto': // <--- Error del Reto
          return 'Formato inválido. Requerido: XXX-000 (Mayúsculas).';
        case 'palabraProhibida': // <--- Error del Factory
          return `No puedes usar la palabra "${errors['palabraProhibida'].value}" en una misión real.`;
        default:
          return 'Error de validación.';
      }
    }
    return null;
  }

  guardarMision() {
    if (this.misionForm.invalid) {
      this.misionForm.markAllAsTouched(); // Marca todo en rojo de golpe
      return;
    }

    // Preparamos el objeto para json-server
    const nuevaMision = {
      ...this.misionForm.value,
      estado: 'Pendiente', // Campo automático
      id: undefined // Dejamos que json-server ponga el ID
    };

    this.http.post('http://localhost:3000/misiones', nuevaMision)
      .subscribe({
        next: () => {
          alert('Misión codificada y enviada al servidor.');
          this.misionForm.reset({ secreto: 'Bajo' }); // Reseteamos manteniendo el select
        },
        error: () => alert('Error de conexión con el Cuartel General.')
      });
  }
}
