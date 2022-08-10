import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any; //for jQuery

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

   //Logout function
   logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('trainer_email');
    this._router.navigate(["/login"]);
  }



}
