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
    this._auth.loginUser(value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        if(res.status && res.role=="trainer") {
        localStorage.setItem('trainer_email', value.email);
        this._router.navigate(['trainer-dashboard']);
        }
        else if(res.status && res.role=="admin"){
          this._router.navigate(['admin-dashboard']);
        }else {
        console.log(res.status)
        alert("invalid username or password")
        }
      }
    )

  }
  

}
