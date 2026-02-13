import { Component, inject } from '@angular/core';
import { CryptoServices } from '../../../Services/services';
import { Aspirant } from '../../../auth/interfaces/interface';

@Component({
  selector: 'app-agent-list',
  imports: [],
  templateUrl: './agent-list.html',
})
export class AgentList {
  private service = inject(CryptoServices);

  agents !: Aspirant[];

  ngOnInit(): void {
    this.service.getAspirants().subscribe({
      
      next: aspirants => {
        this.agents = aspirants
        console.log("Aspirantes recibidos:", aspirants);
        }
    });
  }

  
}
