import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // baseUri: string = "http://localhost:3000/";
  baseUri: string = "https://trainer-management-backend.herokuapp.com/";
  constructor(private http: HttpClient, private _router: Router) { }

  loggedIN() {
    return !!localStorage.getItem('token');
  }

  loginUser(user: any) {
    return this.http.post<any>(this.baseUri+"login", user);
  };

  trainerSignUp(trainer: any) {
    return this.http.post<any>(this.baseUri+"signup", trainer);
  }

  trainerUpdate(trainer: any, pic_url: string) {
    console.log("service side", pic_url)
    return this.http.put<any>(this.baseUri+"enroll", {trainer, pic_uri: pic_url});
    
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

  trainerView(trainer_email: any) {
    return this.http.get<any>(this.baseUri+"trainer-view/"+trainer_email)
  }
  getTrainers() {
    return this.http.get<any>(this.baseUri+"trainers");
  }
  
  trainerApprove(trainer_email) {
    return this.http.put<any>(this.baseUri+"trainer-update/approve-trainer", {email: trainer_email})
  }

  courseAllocate(course) {
    return this.http.put<any>(this.baseUri+"trainer-update/add-course", course)
  }

  assignEmployment(value) {
    return this.http.put<any>(this.baseUri+"trainer-update/set-employment-type", value)
  }
}
