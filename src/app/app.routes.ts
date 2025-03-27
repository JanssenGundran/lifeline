import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { JobBoardComponent } from './job-board/job-board.component';
import { JobManagementComponent } from './job-management/job-management.component';
import { ApplyComponent } from './apply/apply.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: AdminLoginComponent }, 
  { path: 'jobs', component: JobBoardComponent },
  { path: 'manage-jobs', component: JobManagementComponent, canActivate: [AuthGuard] },
  { path: 'apply/:id', component: ApplyComponent },
  { path: '**', redirectTo: 'jobs', pathMatch: 'full' } 
];
