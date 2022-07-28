import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private http:HttpClient) { }
 createProfile(trainer:any){   
  return this.http.post("http://localhost:3000/insert",{trainer})
  .subscribe(data =>{console.log(data)})
  }

}
