import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _router:Router) { }

  registerform!: FormGroup;

  ngOnInit(): void {

    /* ---------- Registration form validation -------------- */
    this.registerform = new FormGroup({
      'fname' : new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      'dob' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [ Validators.required, Validators.email ]),
      'mobile' : new FormControl(null, [ Validators.required, Validators.pattern('/^[6-9]{1}[0-9]{9}$/')]),
      'hqual' : new FormControl(null, [ Validators.required, Validators.pattern('^[a-zA-Z]+$') ]),
      'password' : new FormControl(null, [ Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$') ]),
      'cpassword' : new FormControl(null, Validators.required)
    });

  }

  goHome() {
    this._router.navigate(['/login']);
  }

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
    alert("Your application will be reviewed. Expect an email notification from us.");
  }

}
