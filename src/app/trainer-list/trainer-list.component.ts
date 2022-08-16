import { Component, OnInit } from '@angular/core';
import { trainerModel } from './trainer.model';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {
  searchText:any;
  trainers: trainerModel[] = []
  employmentForm!: FormGroup
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this.employmentForm = new FormGroup({
      employmentType: new FormControl('')
    })
    this._auth.getTrainers()
    .subscribe((data) => {
      this.trainers = data;
      console.log(this.trainers)
    })
    
  }

  trainerApproval(trainer_email) {
    console.log(trainer_email)
    this._auth.trainerApprove(trainer_email)
    .subscribe((data) => {
      console.log(data)
      //window.location.reload()
      this.ngOnInit();
    })

  }
  
  setEmploymentEmail(trainer_data) {
    localStorage.setItem('employmentEmail', trainer_data.email)
    localStorage.setItem('trainer_id', trainer_data.trainer_id)
    localStorage.setItem('trainer_name', trainer_data.name)

  }

  onSubmit(employmenttype) {
    console.log(employmenttype)
    let value = {
      employment_type: employmenttype.employmentType,
      email: localStorage.employmentEmail,
      name: localStorage.trainer_name,
      trainer_id: localStorage.trainer_id
    }
    this._auth.assignEmployment(value)
    .subscribe((data) => {
      console.log(data)
      if (data.status) {
        alert(data.reply)
        localStorage.removeItem('employmentassignee')
        localStorage.removeItem('trainer_id')
        localStorage.removeItem('trainer_name')
        this.ngOnInit()
      }else {
        alert(data.reply)
      }
    })
  }


}
