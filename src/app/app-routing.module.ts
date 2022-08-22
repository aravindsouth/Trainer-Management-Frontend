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
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { 
    path:'trainer-dashboard', component:TrainerDashboardComponent, canActivate: [AuthGuard],
    children: [
      { path:"enroll", component:TrainerEnrollComponent, outlet: "trainerTarget" },
      { path:"view-schedule", component: ViewScheduleComponent, outlet: "trainerTarget" },
    ]
  },
  { path:'admin-dashboard', component:AdminDashboardComponent, canActivate: [AuthGuard],
    children: [
      { path:'trainer-list', component:TrainerListComponent, outlet: "adminTarget"},
      { path:"course-allocation",component:CourseAllocationComponent, outlet: "adminTarget" },
      { path:"admin-calendar",component:AdminCalendarComponent, outlet: "adminTarget" }
    ] },
    { path:'trainer-view/:email', component:TrainerViewComponent, canActivate: [AuthGuard] },
    {path:'update-course/:email', component:UpdateCourseComponent, canActivate: [AuthGuard] }

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
