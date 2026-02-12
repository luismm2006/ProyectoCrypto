import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CryptoServices } from '../../Services/services';
import { Mission } from '../../auth/interfaces/interface';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FormsModule],
  templateUrl: './missionsId.html',
})

export class MissionsId implements OnInit{
    @Input() id !: string;
    private service = inject(CryptoServices);
  
    missionId !: Mission;
  
    ngOnInit(): void {
        this.service.getMissionId(this.id).subscribe({
            next: (res) => this.missionId = res
        })
    }

}