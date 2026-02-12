import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CryptoServices } from '../../Services/services';
import { AuthService } from '../../auth/Services/authService';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FormsModule],
  templateUrl: './missions.html',
})

export class Missions {
  private service = inject(CryptoServices);
  private auth = inject(AuthService);

  missions = this.service.missions;

  statusFilter: string = "todos";

  constructor() {
    this.service.getMissions();
  }

  filterMissions() {
    if(this.statusFilter == 'todos') {
      return this.missions();
    }

    return this.missions().filter(m => m.estado === this.statusFilter);
  }


}