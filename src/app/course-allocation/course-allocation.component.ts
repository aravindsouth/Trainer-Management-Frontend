import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-allocation',
  templateUrl: './course-allocation.component.html',
  styleUrls: ['./course-allocation.component.css']
})
export class CourseAllocationComponent implements OnInit {
 
 searchText:any;
 course_alloc_form!: FormGroup;
  constructor() { }

  ngOnInit(): void {

    this.course_alloc_form=new FormGroup({
      'course_id':new FormControl('',Validators.required),
      'course_name':new FormControl(''),
      'batch_id':new FormControl('',Validators.required),
      'start_date':new FormControl('',Validators.required),
      'end_date':new FormControl('',Validators.required),
      'time':new FormControl('',Validators.required),
      'meet_link':new FormControl('',Validators.required),
      'schedule':new FormControl('',Validators.required),
    });
  }

 
  trainers=[
    {t_id:1, name:"Trainer1", email:"tr1@gmail.com", type:"internal", courses:"FSD"},
    {t_id:2, name:"Trainer2", email:"tr2@gmail.com" , type:"empanelled", courses:"software testing"},
    {t_id:3, name:"Trainer3", email:"tr3@gmail.com" , type:"industry expert", courses:"cyber security"},
    {t_id:4, name:"Trainer4", email:"tr4@gmail.com" , type:"internal", courses:"data science"},
    {t_id:5, name:"Trainer5", email:"tr5@gmail.com" , type:"industry expert", courses:"cyber security"}
    
  ];

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
  get time(){
    return this.course_alloc_form.get('time');
  }
  get meet_link(){
    return this.course_alloc_form.get('meet_link');
  }
  get schedule(){
    return this.course_alloc_form.get('schedule');
  }

  courseSubmit(){
    console.log(this.course_alloc_form.value);
    alert("course assigned");
  }

}
