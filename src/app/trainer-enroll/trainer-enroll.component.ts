import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-trainer-enroll',
  templateUrl: './trainer-enroll.component.html',
  styleUrls: ['./trainer-enroll.component.css']
})
export class TrainerEnrollComponent implements OnInit {
  dropdownList;
  dropdownSettings;

  constructor(private _router: Router, private _auth: AuthService, private http: HttpClient) { }

  trainerData: any = { name: '', address: '', email: '', dob: '', phone: '', photo: '', highestqual: '', skills: '', company: '', designation: '', courses: '' };
  trainerEmail: string | null = localStorage.getItem('trainer_email');

  enroll_form!: FormGroup;

  ngOnInit(): void {

   

    AOS.init();

    /* ------ Get trainer details from db */
    this._auth.trainerProfile(this.trainerEmail)
      .subscribe((data) => {
        console.log(data);
        this.trainerData = data;
      })

    this.enroll_form = new FormGroup({
      't_id': new UntypedFormControl(''),
      'fname': new UntypedFormControl(''),
      'email': new UntypedFormControl(''),
      'phone': new UntypedFormControl(''),
      'address': new UntypedFormControl('', Validators.required),
      'photo': new UntypedFormControl('', Validators.required),
      'hqual': new UntypedFormControl(''),
      'skills': new UntypedFormControl('', Validators.required),
      'company': new UntypedFormControl('', Validators.required),
      'desig': new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      'courses': new UntypedFormControl('', Validators.required)
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

  getData(): Array<any> {
    return [
      { course_id: 1, course_name: 'Full Stack Development' },
      { course_id: 2, course_name: 'Software Testing' },
      { course_id: 3, course_name: 'Data Science & Analytics' },
      { course_id: 4, course_name: 'Robotic Process Automation' },
      { course_id: 5, course_name: 'Cyber Security Analyst' }
    ];
  }

  onItemSelect($event: any) {
    console.log('$event is', $event)
  }

  get address() {
    return this.enroll_form.get('address');
  }
  get photo() {
    return this.enroll_form.get('photo');
  }
  get skills() {
    return this.enroll_form.get('skills');
  }
  get company() {
    return this.enroll_form.get('company');
  }
  get desig() {
    return this.enroll_form.get('desig');
  }
  get courses() {
    return this.enroll_form.get('courses');
  }

  uploadImage: any;
  onImageChangeFromFile($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      console.log(file);
      if (file.type === "image/jpeg" || file.type === "image/png") {
        console.log("correct format");        
        this.uploadImage = file;
      }
      else {
        this.photo?.reset();
        console.log("Incorrect format");
      }
    }
  }


  // update trainer profile
 
  enrollSubmit() {

    //for uploading image
    const formData = new FormData();
    formData.append('file', this.uploadImage);
    
    this.http.post<any>('http://localhost:3000/uploadphoto', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

    //for updating info --------------    
    this._auth.trainerUpdate(this.trainerData)
      .subscribe((data) => {
        console.log(data);
        alert('Trainer Data Updated');
        this.trainerData = data;
        this._router.navigate(["/trainer-dashboard/(trainerTarget:enroll)"]);
      });
      
  }

}