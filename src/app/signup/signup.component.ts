import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import * as AOS from 'aos';
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

  rpassmsg = "";

  @ViewChild('pwdmeter') passmeter!: ElementRef;

  constructor(private _router:Router, private formBuilder:FormBuilder, private _auth: AuthService) { }

  ngOnInit(): void {
 // AOS.init();

    /* ---------- Registration form validation -------------- */

  

    this.registerform = this.formBuilder.group({ 
      fname: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z ]*$/)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      hqual: ['', [Validators.required, Validators.minLength(2)]],
      //password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/gm)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/)]],
      cpassword: ['', Validators.required]

    })
   
    
  }

  // Function to navigate to home
  goHome() {
    this._router.navigate(['/login']);
  }

  /* ------ DONT LET THE FIRST ENTRY BE WHITE SPACE ------- */
  noFirstSpace(event:any){
    if(event.target.selectionStart === 0 && event.keyCode == "32"){
      
      event.preventDefault();

    }
  }

  /* ------ PASSWORD STRENGTH METER ------- */
  isPasswordStrong() {
 
    const input = this.registerform.get('password')?.value;
    const indicator = this.registerform.get('.indicator')?.value;
    const weak = this.registerform.get('.weak')?.value;
    const medium = this.registerform.get('.medium')?.value;
    const strong = this.registerform.get('.strong');
    const strText = this.registerform.get('.strength-text');

    console.log(input+"\n"+this.passmeter);

    if(input != ""){
      // indicator.style.display = "block";
      // indicator.style.display = "flex";
    }

  }
  

  /* ------ PASSWORD MATCH CHECK ------- */
  checkPassword() {
    const pass = this.registerform.get('password')?.value;
    const rpass = this.registerform.get('cpassword')?.value;
    
        
    if(pass !== rpass){
      console.log("password dont match");
      this.rpassmsg = "Passwords don't match";

    }
    else{
      console.log("match");
      this.rpassmsg = "Passwords Match";      
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