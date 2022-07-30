import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { HeaderComponent } from './header/header.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    TrainerDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ShowHidePasswordModule,
    HttpClientModule
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
