import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aspirant, Mission } from '../auth/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class CryptoServices {
  private URL_BaseAspirantes = "http://localhost:3000/aspirantes";
  private URL_BaseMissions = "http://localhost:3000";

  private _missions = signal<Mission[]>([]);

  missions = this._missions.asReadonly();


  private _aspirants = signal<Aspirant[]>([]);

  aspirants = this._aspirants.asReadonly();

  private httpClient = inject(HttpClient);


  getMissions() {
    this.httpClient.get<Mission[]>(this.URL_BaseMissions + "/misiones").subscribe({
      next: missions => this._missions.set(missions),
      error: error => console.error
    })
  }

  getMissionId(id : string){
    return this.httpClient.get<Mission>(this.URL_BaseMissions + "/misiones/" + id);
  }

  getAspirants() {
    this.httpClient.get<Aspirant[]>(this.URL_BaseAspirantes).subscribe({
      next: aspirants => this._aspirants.set(aspirants),
      error: error => console.error
    })
  }

  addAspirant(newAspirant: Omit<Aspirant, "id">) {
    this.httpClient.post<Aspirant>(this.URL_BaseAspirantes, newAspirant).subscribe({
      next: aspirant => this.getAspirants(),
      error: error => console.log(error)
    })
  }

  addMission(newMission: any) {

    const missionToSend = {
      codigo: newMission.codigo,
      titulo: newMission.titulo,
      descripcion: newMission.descripcion,
      secreto: newMission.secreto,
      estado: newMission.estado,
      agenteId: Number(newMission.agenteId) || null
    };

    this.httpClient.post<Mission>(this.URL_BaseMissions, missionToSend)
      .subscribe({
        next: mission => this._missions.update(prev => [...prev, mission]),
        error: error => console.error(error)
      });
  }


}