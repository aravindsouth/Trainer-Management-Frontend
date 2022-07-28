import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform!: FormGroup;
  submitted = false; // Boolean variable to say the form is not submitted

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
    /*---------- Login form Validation using reactive forms ------- */
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

 
  }

  login() {
    this.submitted = true;

    if(this.loginform.invalid){
      console.log(this.loginform.controls);
      
      return;
    }

    else {
      console.log('Success');
      console.log(this.loginform.controls);
    }
  }
  

}
