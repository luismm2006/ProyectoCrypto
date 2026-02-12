import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { JWTPayload, LoginResponse, User } from '../interfaces/interface';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = "http://localhost:3000";
  private httpClient : HttpClient = inject(HttpClient);
  private _user = signal<User|null> (null);
  user = this._user.asReadonly();

  constructor(){
    const token = localStorage.getItem("token") || "";
    if(token){
      this.verifyToken()
      .subscribe({
        next : response => {
          const {id ,email , nombre, alias, role} = jwtDecode<JWTPayload>(token);
          this._user.set({id ,email , nombre, alias, role});
        },
        error: error => {
          localStorage.removeItem('token')
        }
      })
    }
  }



  verifyToken(){
    return this.httpClient.get(this.URL + "/verify")
  }



  login(email : string, password : string){
    return this.httpClient.post<LoginResponse>(this.URL + "/login", {email, password})
    .pipe(
      tap( resp => {
        this._user.set(resp.user);
        localStorage.setItem("token", resp.token);
      })
    )
  }
}
