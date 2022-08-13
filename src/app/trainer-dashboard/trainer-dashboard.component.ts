import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

//declaring custom js functions
declare function toggleNotification(box:any):any;
declare function toggleSidebar(sidebar:any, closebtn:any):any;

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.css']
})
export class TrainerDashboardComponent implements OnInit {

  constructor(private _router: Router, private _auth: AuthService) { }

  trainerData: any = {name:'', email:'', dob:'',phone:''};
  trainerEmail: string | null = localStorage.getItem('trainer_email')
  ngOnInit(): void {
    console.log(this.trainerEmail)
    this._auth.trainerProfile(this.trainerEmail)
    .subscribe((data) => {
      console.log(data);
      this.trainerData = data;
    })
  }

  //Logout function
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('trainer_email');
    this._router.navigate(["/login"]);
  }

  //clicked link active
  clicked: boolean = false;

  Clicked() {
    this.clicked = true;
    // document.getElementById("sidelink3")?.style.color="white";
  }

  //Calling external js function inside a native function
  notificationToggle() {

    const box = document.getElementById('notifi-box');
    
    toggleNotification(box);

  }


  //Sidebar toggle function
  sidebarToggle() {
    const sidebar = document.getElementById('menu');
    const closebtn = document.getElementById('closebtn');
    toggleSidebar(sidebar,closebtn);
  }
  
  
}