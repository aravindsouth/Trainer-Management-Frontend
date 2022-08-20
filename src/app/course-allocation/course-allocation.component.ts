import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trainerModel } from '../trainer-list/trainer.model';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-course-allocation',
  templateUrl: './course-allocation.component.html',
  styleUrls: ['./course-allocation.component.css']
})
export class CourseAllocationComponent implements OnInit {
 
 trainers: trainerModel[] = []
 searchText:any;
 courseAllocated:boolean = false;
 course_alloc_form!: FormGroup;
  constructor(private _auth: AuthService) { }
  


  ngOnInit(): void {

    this.course_alloc_form=new FormGroup({
      'course_id':new FormControl('',Validators.required),
      'course_name':new FormControl(''),
      'batch_id':new FormControl('',Validators.required),
      'start_date':new FormControl('',Validators.required),
      'end_date':new FormControl('',Validators.required),
      'course_time':new FormControl('',Validators.required),
      'meetlink':new FormControl('',Validators.required),
      'schedule':new FormControl('',Validators.required),
    });

    this.getDate();

    this._auth.getTrainers()
    .subscribe((data) => {
      this.trainers = data;
      console.log(this.trainers)
    })
  }

  minDate:any =""
  getDate() {
    var date:any = new Date();
    var toDate: any = date.getDate();
    if(toDate < 10) {
      toDate = "0" + toDate;
    }
    var month = date.getMonth() + 1;
    if(month < 10) {
      month = "0" + month;
    }
    var year = date.getFullYear();
    this.minDate = year + "-" + month + "-" + toDate;
    console.log(this.minDate);
  }

 
  // trainers=[
  //   {id:1, name:"Trainer1", email:"tr1@gmail.com", type:"internal", courses:"FSD"},
  //   {id:2, name:"Trainer2", email:"tr2@gmail.com" , type:"empanelled", courses:"software testing"},
  //   {id:3, name:"Trainer3", email:"tr3@gmail.com" , type:"industry expert", courses:"cyber security"},
  //   {id:4, name:"Trainer4", email:"tr4@gmail.com" , type:"internal", courses:"data science"},
  //   {id:5, name:"Trainer5", email:"tr5@gmail.com" , type:"industry expert", courses:"cyber security"}
    
  // ];

  get course_id(){
    return this.course_alloc_form.get('course_id');
  }
  get batch_id(){
    return this.course_alloc_form.get('batch_id');
  }
  get start_date(){
    return this.course_alloc_form.get('start_date');
  }
  get end_date(){
    return this.course_alloc_form.get('end_date');
  }
  get course_time(){
    return this.course_alloc_form.get('course_time');
  }
  get meetlink(){
    return this.course_alloc_form.get('meetlink');
  }
  get schedule(){
    return this.course_alloc_form.get('schedule');
  }

  setTrainer(trainer) {
    localStorage.setItem('trainer', trainer)
  }
   
    courseAllocation(value) {
      this.courseAllocated = true;
      console.log(value)
      value.email = localStorage.getItem('trainer')
      this._auth.courseAllocate(value)
      .subscribe((data) => {
        console.log(data)
        if(data.status){
          alert(data.reason)
          this.ngOnInit()
        }else {
          alert(data.reason)
        }
        
      })
    }
}
