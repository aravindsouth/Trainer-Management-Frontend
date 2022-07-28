import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerform!: UntypedFormGroup;
  submitted = false; // Boolean variable to say the form is not submitted

  constructor(private _router:Router, private formBuilder:UntypedFormBuilder) { }

  ngOnInit(): void {

    /* ---------- Registration form validation -------------- */

    // this.registerform = new FormGroup({
    //   'fname' : new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    //   'dob' : new FormControl(null, Validators.required),
    //   'email' : new FormControl(null, [ Validators.required, Validators.email ]),
    //   'mobile' : new FormControl(null, [ Validators.required, Validators.pattern('/^[6-9]{1}[0-9]{9}$/')]),
    //   'hqual' : new FormControl(null, [ Validators.required, Validators.pattern('^[a-zA-Z]+$') ]),
    //   'password' : new FormControl(null, [ Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$') ]),
    //   'cpassword' : new FormControl(null, Validators.required)
    // });

    this.registerform = this.formBuilder.group({ 
      fname: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]*$')]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[6-9]\d{9}$/gi')]],
      hqual: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]

    })

    
  }

  // Function to navigate to home
  goHome() {
    this._router.navigate(['/login']);
  }

  /* ------ PASSWORD MATCH CHECK ------- */
  checkPassword() {
    const pass = this.registerform.get('password')?.value;
    const rpass = this.registerform.get('cpassword')?.value
    if(pass !== rpass){
      console.log("password dont match");
    }
    else{
      console.log("match")
    }

  }

  onSubmit() {
    this.submitted = true;

    if(this.registerform.invalid){
      console.log(this.registerform);
      return;
    }

    else {
      alert("Your information have been forwarded to the admin. The status of your enrolment will be informed via Email you have provided.");
    }
  }

}
