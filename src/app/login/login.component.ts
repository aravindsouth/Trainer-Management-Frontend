import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform!: FormGroup;
  submitted = false; // Boolean variable to say the form is not submitted

  constructor(private formBuilder:FormBuilder, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    
    /*---------- Login form Validation using reactive forms ------- */
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

 
  }

  // login() {
  //   this.submitted = true;

  //   if(this.loginform.invalid){
  //     console.log(this.loginform.controls);
      
  //     return;
  //   }

  //   else {
  //     console.log('Success');
  //     console.log(this.loginform.controls);
  //   }
  // }

  login(value: any) {
    this.submitted = true;
    this._auth.loginUser(value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['trainer-dashboard']);
        console.log(res.error)
      }
    )
  }  

}
