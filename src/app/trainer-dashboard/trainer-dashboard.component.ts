import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {

  constructor(private _router: Router) { }

  

  ngOnInit(): void {
  }

  //Logout function
  logOut() {
    localStorage.removeItem('token');
    this._router.navigate(["/login"]);
  }

  hamburger() {
    let ham:any = document.getElementById('menu-btn');
    let menu:any = document.getElementById('menu');

    if(menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
  
  
}
