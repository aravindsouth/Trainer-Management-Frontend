import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUri: string = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  loginUser(user: any) {
    return this.http.post<any>(this.baseUri+"login", user);
  };

  trainerSignUp(trainer: any) {
    return this.http.post<any>(this.baseUri+"signup", trainer);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  getTrainerList() {
 return this.http.get<any>(this.baseUri+"trainers");
  }
}