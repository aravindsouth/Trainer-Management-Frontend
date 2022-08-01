import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormGroup } from '@angular/forms';
import * as AOS from 'aos';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-trainer-enroll',
  templateUrl: './trainer-enroll.component.html',
  styleUrls: ['./trainer-enroll.component.css']
})
export class TrainerEnrollComponent implements OnInit {
dropdownList;
dropdownSettings;

  constructor() { }

 enroll_form!: FormGroup;

  ngOnInit(): void {
    AOS.init();

    this.enroll_form=new FormGroup({
      't_id':new UntypedFormControl(''),
      'fname':new UntypedFormControl(''),
      'email':new UntypedFormControl(''),
      'phone':new UntypedFormControl(''),
      'address':new UntypedFormControl('',Validators.required),
      'photo':new UntypedFormControl('',Validators.required),
      'hqual':new UntypedFormControl(''),
      'skills':new UntypedFormControl('',Validators.required),
      'company':new UntypedFormControl('',Validators.required),
      'desig':new UntypedFormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      'courses':new UntypedFormControl('',Validators.required)
      });


    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'course_id',
      textField: 'course_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
  }

  getData() : Array<any>{
    return[
      { course_id: 1, course_name: 'Full Stack Development'},
      { course_id: 2, course_name: 'Software Testing'},
      { course_id: 3, course_name: 'Data Science & Analytics'},
      { course_id: 3, course_name: 'Robotic Process Automation'},
      { course_id: 4, course_name: 'Cyber Security Analyst'}
    ];
  }

  onItemSelect($event: any){
    console.log('$event is', $event)
  }

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
    get courses(){
      return this.enroll_form.get('courses');
    }
 
  onImageChangeFromFile($event:any)
  {
    if($event.target.files && $event.target.files[0]){
      let file = $event.target.files[0];
      console.log(file);
      if(file.type == "image/jpeg")
      {
        console.log("correct format");
      }
      else{
        this.photo?.reset();
        console.log("Incorrect format");
        }
    }
  }
 
  enrollSubmit(){
    console.log(this.enroll_form.value);
    alert("Your information have been successfully submitted");
  }

}
