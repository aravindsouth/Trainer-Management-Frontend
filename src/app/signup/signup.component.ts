import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, UntypedFormGroup, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerform!: FormGroup;
  submitted = false; // Boolean variable to say the form is not submitted

  constructor(private _router:Router, private formBuilder:FormBuilder, private _auth: AuthService) { }

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
      fname: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z ]*$/)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      hqual: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm)]],
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
      console.log("match");
      
    }

  }

  // onSubmit() {
  //   this.submitted = true;

  //   if(this.registerform.invalid){
  //     console.log(this.registerform);
  //     return;
  //   }

  //   else {
  //     alert("Your information have been forwarded to the admin. The status of your enrolment will be informed via Email you have provided.");
  //   }
  // }

  onSubmit(value: any) {
    const trainer = {
      email: value.email,
      password: value.password,
      fname: value.fname,
      dob: value.dob,
      mobile: value.mobile,
      hqual: value.hqual
    }
    console.log(value);
    console.log(trainer)
    this._auth.trainerSignUp(trainer)
    .subscribe((data) =>{
      let status = data.status
      console.log(status)
      console.log(data.reason)
      // this._router.navigate(['login'])
      // alert('New user added')
      if (!status) {
        alert("User already exists")
        this._router.navigate(["/signup"])
        window.location.reload();
      }
      else {
        console.log("new user added")
        this._router.navigate(["/login"])
      }
    })
  
   }

}
