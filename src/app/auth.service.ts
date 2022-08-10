import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUri: string = "http://localhost:3000/";
  constructor(private http: HttpClient, private _router: Router) { }

  loginUser(user: any) {
    return this.http.post<any>(this.baseUri+"login", user);
  };

  trainerSignUp(trainer: any) {
    return this.http.post<any>(this.baseUri+"signup", trainer);
  }

  trainerUpdate(trainer: any) {
    return this.http.put<any>(this.baseUri+"enroll", trainer);
    
  }

  getToken() {
    return localStorage.getItem('token');
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('trainer_email');
    this._router.navigate(["/login"]);
  }

  trainerProfile(trainer_email: any) {
    // return this.http.get<any>(this.baseUri+"trainer-profile",{params:{"trainer_email": trainer_email}})
    return this.http.get<any>(this.baseUri+"trainer-profile/"+trainer_email)
  }
  getTrainers() {
    return this.http.get<any>(this.baseUri+"trainers");
  }
  
  trainerApprove(trainer_email) {
    return this.http.put<any>(this.baseUri+"approve-trainer", {email: trainer_email})
  }
}
