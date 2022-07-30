import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerEnrollComponent } from './trainer-enroll/trainer-enroll.component';

const routes: Routes = [
  {path:"enroll",component:TrainerEnrollComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
