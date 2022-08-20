import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './trainer-view.component.html',
  styleUrls: ['./trainer-view.component.css']
})
export class TrainerViewComponent implements OnInit {


  constructor(private _router: Router, private _auth: AuthService) { }

  trainerData: any = { name: '', address: '', email: '', dob: '', phone: '', photo: '', highestqual: '', skills: '', company: '', designation: '', courses: '' };
  trainerEmail: string | null = localStorage.getItem('trainer_email');

  ngOnInit(): void {


    /* ------ Get trainer details from db */
    this._auth.trainerView(this.trainerEmail)
      .subscribe((data) => {
        console.log(data);
        this.trainerData = data;
      })

  }

}
