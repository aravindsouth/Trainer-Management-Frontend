import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  logoutAdmin() {
    localStorage.removeItem('token')
    console.log('admin logged out')
    this._router.navigate(['login'])
  }
}
