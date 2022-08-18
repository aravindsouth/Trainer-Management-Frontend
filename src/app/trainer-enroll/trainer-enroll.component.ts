import { Component, OnInit, NgZone } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from '../auth.service';
import {Storage, getStorage, ref, getDownloadURL, uploadBytesResumable} from '@angular/fire/storage'
import { initializeApp } from 'firebase/app';


@Component({
  selector: 'app-trainer-enroll',
  templateUrl: './trainer-enroll.component.html',
  styleUrls: ['./trainer-enroll.component.css']
})
export class TrainerEnrollComponent implements OnInit {
  dropdownList;
  dropdownSettings;
  
  public image_file: any = {}
  public profile_pic!: string
  constructor(private _router: Router, private _auth: AuthService, public storage: Storage, private _ngZone: NgZone) { }

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

  onImageChangeFromFile($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      console.log(file);
      if (file.type == "image/jpeg" || "image/png") {
        this.image_file = file;
        console.log("correct format");
      }
      else {
        this.photo?.reset();
        console.log("Incorrect format");
      }
    }
  }


  // update trainer profile
  enrollSubmit() {
    // file upload
    const storageRef = ref(this.storage, this.image_file.name)
    const uploadTask = uploadBytesResumable(storageRef, this.image_file);
    uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error)
      alert("file upload error")
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        this.profile_pic = downloadURL
        console.log(this.profile_pic)
        console.log('File available at', downloadURL);
        this._auth.trainerUpdate(this.trainerData, this.profile_pic)
        .subscribe((data) => {
          console.log(data);
          alert('Trainer Data Updated');
          this.trainerData = data;
          this._ngZone.run(() => { 
          this._router.navigate(["/trainer-dashboard"]);
          window.location.reload();
         });
          
        });
        
      });
    }
    
   
   
    )
      
  }

}