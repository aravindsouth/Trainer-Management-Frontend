import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

import { TrainerEnrollComponent } from './trainer-enroll/trainer-enroll.component';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';

import { TokenInterceptorService } from './token-interceptor.service';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { HeaderComponent } from './header/header.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';

import { CourseAllocationComponent } from './course-allocation/course-allocation.component';
import { TrainerViewComponent } from './trainer-view/trainer-view.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { TrainerLandingComponent } from './trainer-landing/trainer-landing.component';
import { ViewCourseComponent } from './view-course/view-course.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrainerEnrollComponent,
    routingComponents,
    TrainerDashboardComponent,
    AdminDashboardComponent,
    TrainerListComponent,
    CourseAllocationComponent,
    TrainerViewComponent,
    ViewScheduleComponent,
    TrainerLandingComponent,
    ViewCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    FullCalendarModule
  ],
  providers: [AuthService, TokenInterceptorService,

  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
