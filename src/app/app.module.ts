import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/auth/auth.service';
import { PostService } from './post/service/post.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './_guard/auth-guard.guard';
import { TokenInterceptor } from './_interceptor/token-interceptor';
import { PostComponent } from './post/post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert/alert.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },
  { path: 'post', component: PostComponent, canActivate: [AuthGuardGuard] },
  { path: 'post/create', component: PostFormComponent, canActivate: [ AuthGuardGuard ] },
];

const BASE_URL = 'http://localhost:3000/api/v1';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    PostComponent,
    PostFormComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuardGuard,
    PostService,
    AlertService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'BASE_URL', useValue: BASE_URL},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
