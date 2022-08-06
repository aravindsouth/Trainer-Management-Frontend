import { Component, OnInit } from '@angular/core';
import { trainerModel } from './trainer.model';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {

  trainers: trainerModel[] = []
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.getTrainers()
    .subscribe((data) => {
      this.trainers = data;
      console.log(this.trainers)
    })
    
  }

}
