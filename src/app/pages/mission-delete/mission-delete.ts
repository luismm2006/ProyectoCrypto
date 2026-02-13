import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CryptoServices } from '../../Services/services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mission-delete',
  imports: [ReactiveFormsModule, FormsModule, SwalComponent],
  templateUrl: './mission-delete.html',
})
export class MissionDelete implements OnInit {
  @Input() id !: string;
  private router = inject(Router);
  private service = inject(CryptoServices);
  private fb = inject(FormBuilder);
  public misionDeleteForm : FormGroup = this.fb.group({
          codigo: ["", []],
          titulo: ["", []],
          descripcion: ["", []],
          secreto: ["", []],
          estado:  ["", []],
          agenteId:  ["", []]
  }) 

  ngOnInit(): void {
    this.service.getMissionId(this.id).subscribe({
      next: (res) => {
        this.misionDeleteForm.patchValue({
            codigo: res.codigo,
            titulo: res.titulo,
            descripcion: res.descripcion,
            secreto: res.secreto,
            estado: res.estado,
            agenteId: res.agenteId
        })
        this.misionDeleteForm.disable();
      }
        
    })
  }
  @ViewChild ("swalSuccess") swalSuccess !: SwalComponent;
  @ViewChild ("swalError") swalError !: SwalComponent;

  misionDelete(){
    this.service.deleteMission(this.id).subscribe({
      next : () => {
        this.swalSuccess.fire();
        this.router.navigate(["/missions"]);
      }
    })
  }

}
