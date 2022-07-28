import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as AOS from 'aos';
import { TrainerService } from '../trainer.service';


@Component({
  selector: 'app-trainer-enroll',
  templateUrl: './trainer-enroll.component.html',
  styleUrls: ['./trainer-enroll.component.css']
})
export class TrainerEnrollComponent implements OnInit {

  constructor(private trainerService:TrainerService) { }
 
  ngOnInit(): void {
    AOS.init();
  }

    enroll_form = new FormGroup({
    't_id':new FormControl(''),
    'fname':new FormControl(''),
    'email':new FormControl(''),
    'phone':new FormControl(''),
    'address':new FormControl('',Validators.required),
    'photo':new FormControl('',Validators.required),
    'hqual':new FormControl(''),
    'skills':new FormControl('',Validators.required),
    'company':new FormControl('',Validators.required),
    'desig':new FormControl('',Validators.required)
    })
  
    get address(){
      return this.enroll_form.get('address');
    }
    get photo(){
      return this.enroll_form.get('photo');
    }
    get skills(){
      return this.enroll_form.get('skills');
    }
    get company(){
      return this.enroll_form.get('company');
    }
    get desig(){
      return this.enroll_form.get('desig');
    }
 
  onImageChangeFromFile($event:any)
  {
    if($event.target.files && $event.target.files[0]){
      let file = $event.target.files[0];
      console.log(file);
      if(file.type == "image/jpeg")
      {
        console.log("correct");
      }
      else{
        this.photo?.reset();
        alert("JPG image is required");
        }
    }
  }
 
  enrollSubmit(){
    
    this.trainerService.createProfile(this.enroll_form.value);
    console.log("success");
  }

}
