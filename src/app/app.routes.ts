import { Routes } from '@angular/router';
import { JobBoardComponent } from './job-board/job-board.component';
import { JobManagementComponent } from './job-management/job-management.component';
import { ApplyComponent } from './apply/apply.component';

export const routes: Routes = [
  { path: 'jobs', component: JobBoardComponent },
  { path: 'manage-jobs', component: JobManagementComponent },
  { path: 'apply/:id', component: ApplyComponent },
];
