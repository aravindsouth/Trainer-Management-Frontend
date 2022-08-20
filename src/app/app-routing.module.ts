import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerEnrollComponent } from './trainer-enroll/trainer-enroll.component';
 
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CourseAllocationComponent } from './course-allocation/course-allocation.component';
import { TrainerViewComponent } from './trainer-view/trainer-view.component';
import { UpdateCourseComponent } from './update-course/update-course.component';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { 
    path:'trainer-dashboard', component:TrainerDashboardComponent,
    children: [
      { path:"enroll", component:TrainerEnrollComponent, outlet: "trainerTarget" }
    ]
  },
  { path:'admin-dashboard', component:AdminDashboardComponent,
    children: [
      { path:'trainer-list', component:TrainerListComponent, outlet: "adminTarget"},
      { path:"course-allocation",component:CourseAllocationComponent, outlet: "adminTarget" }
    ] },
    { path:'trainer-view/:email', component:TrainerViewComponent },
    {path:'update-course/:email', component:UpdateCourseComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ 
  LoginComponent,
  SignupComponent,
  TrainerDashboardComponent,
  TrainerEnrollComponent,
 ]
