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
  applicant = { name: '', email: '' }; 

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getJobs().subscribe(jobs => this.jobs = jobs);
  }

  addJob(): void {
    if (!this.newJob.title || !this.newJob.description) return; // Basic validation

    this.jobService.addJob(this.newJob).subscribe(() => {
      this.fetchJobs();
      this.newJob = { title: '', description: '', maxHires: 1 }; // Reset after adding
    });
  }

  startEditing(job: any): void {
    this.editingJob = { ...job };
  }

  updateJob(): void {
    if (!this.editingJob) return;

    this.jobService.updateJob(this.editingJob._id, this.editingJob).subscribe(() => {
      this.fetchJobs();
      this.editingJob = null; // Reset editing mode
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
    if (!applicant.name || !applicant.email) {
      alert('Please fill out applicant information');
      return;
    }
  
    this.jobService.hireApplicant(jobId, applicant).subscribe(
      () => {
        this.fetchJobs(); // Refresh the job list
      },
      (error) => console.error('Error hiring applicant:', error)
    );
  }
}  