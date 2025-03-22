import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../job.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css']
})
export class JobBoardComponent implements OnInit {
  jobs: any[] = [];

  constructor(private jobService: JobService, private router: Router) {}

  navigateToApply(jobId: string): void {
    this.router.navigate(['/apply', jobId]);
  }

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (error) => {
        console.error('Error fetching jobs:', error);
        alert('Failed to fetch jobs. Please try again later.');
      }
    });
  }
}
