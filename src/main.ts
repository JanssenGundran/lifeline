import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component'; 
import { JobBoardComponent } from './app/job-board/job-board.component';
import { ApplyComponent } from './app/apply/apply.component';
import { JobManagementComponent } from './app/job-management/job-management.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'jobs', component: JobBoardComponent },
  { path: 'apply/:id', component: ApplyComponent },
  { path: 'manage-jobs', component: JobManagementComponent }
];

bootstrapApplication(AppComponent, {  
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, FormsModule)
  ],
});
