import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-job-management',
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './job-management.component.html',
  styleUrls: ['./job-management.component.css']
})
export class JobManagementComponent implements OnInit {
  jobs: any[] = [];
  newJob = { title: '', description: '', maxHires: 1 };
  editingJob: any = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getJobs().subscribe(jobs => this.jobs = jobs);
  }

  addJob(): void {
    this.jobService.addJob(this.newJob).subscribe(() => {
      this.fetchJobs();
      this.newJob = { title: '', description: '', maxHires: 1 };
    });
  }

  startEditing(job: any): void {
    this.editingJob = { ...job };
  }

  updateJob(): void {
    if (!this.editingJob) return;

    this.jobService.updateJob(this.editingJob._id, this.editingJob).subscribe(() => {
      this.fetchJobs();
      this.editingJob = null;
    });
  }

  deleteJob(jobId: string): void {
    if (confirm("Are you sure you want to delete this job?")) {
      this.jobService.deleteJob(jobId).subscribe(() => {
        this.fetchJobs();
      });
    }
  }

  hireApplicant(jobId: string, applicant: any): void {
    this.jobService.hireApplicant(jobId, applicant).subscribe(
      () => this.fetchJobs(), 
      (error) => console.error('Error hiring:', error)
    );
  }
  
  
}
