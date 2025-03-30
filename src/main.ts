import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component'; 
import { JobBoardComponent } from './app/job-board/job-board.component';
import { ApplyComponent } from './app/apply/apply.component';
import { JobManagementComponent } from './app/job-management/job-management.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminLoginComponent } from './app/admin-login/admin-login.component';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { ContactComponent } from './app/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: AdminLoginComponent }, 
  { path: 'jobs', component: JobBoardComponent },
  { path: 'apply/:id', component: ApplyComponent },
  { path: 'manage-jobs', component: JobManagementComponent }
];

bootstrapApplication(AppComponent, {  
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, FormsModule),
    provideHttpClient()
  ],
}); 
