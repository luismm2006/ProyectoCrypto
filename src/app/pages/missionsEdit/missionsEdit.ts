import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CryptoServices } from '../../Services/services';
import { Mission } from '../../auth/interfaces/interface';
import { CommonModule } from '@angular/common';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { NewMission } from '../new-mission/new-mission';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FormsModule, CommonModule, SwalComponent, ReactiveFormsModule],
  templateUrl: './missionsEdit.html',
})

export class MissionsEdit implements OnInit{
    @Input() id !: string;
    private service = inject(CryptoServices);
    private fb : FormBuilder = inject(FormBuilder);
    private router = inject(Router);

    public misionEditForm : FormGroup = this.fb.group({
        //El codigo se hara validacion personalizada
        codigo: ["", [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{3}$/)]],
        //El codigo se hara validacion personalizada

        titulo: ["", [Validators.required]],
        descripcion: ["", [Validators.required]],
        secreto: ["", [Validators.required]],
        estado:  ["", [Validators.required]],
        agenteId:  ["", [Validators.required]]
    }) 

    missionEdit !: Mission;

    notValidField(field : string){
        return this.misionEditForm.controls[field].invalid && this.misionEditForm.controls[field].touched;
    }

    getFieldError(field : string){
        if(!this.misionEditForm.controls[field])return null;

        const errors = this.misionEditForm.controls[field].errors || {};

        for(const key of Object.keys(errors)){
            switch(key){
                case "required":
                    return "Este campo es requerido"
                case "pattern":
                    return "Formato requerido: 3 letras, guión, 3 números."
                default:
                    return null
            }
        }
        return null;
    }

    @ViewChild ("swalSuccess") swalSuccess !: SwalComponent;
    @ViewChild ("swalError") swalError !: SwalComponent;

    guardarMisionEditada(){
        if(!this.misionEditForm.valid){
            this.swalError.fire();
            return;
        }
        const newMission = {
            ...this.misionEditForm.value
        }
        this.service.missionEdit(this.id, newMission).subscribe({
            next: response => {
                this.router.navigate(['/'])
                this.swalSuccess.fire();
            },
            error: () => {
                this.swalError.fire();
            }
        })
    }
    
    ngOnInit(): void {
        this.service.getMissionId(this.id).subscribe({
        next: (res) => {
        this.missionEdit = res;

        this.misionEditForm.patchValue({
            codigo: res.codigo,
            titulo: res.titulo,
            descripcion: res.descripcion,
            secreto: res.secreto,
            estado: res.estado,
            agenteId: res.agenteId
        });
        }
    });
}

}