import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';

const routes: Routes = [
  { path:'',redirectTo:'login',pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { path:'trainer-dashboard', component:TrainerDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ 
  LoginComponent,
  SignupComponent,
  TrainerDashboardComponent
 ]