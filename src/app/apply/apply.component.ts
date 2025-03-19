import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../job.service';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-apply',
  standalone: true, 
  imports: [CommonModule, FormsModule],  
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  jobId: string = '';
  job: any = { waitingList: [], hiredList: [] };
  applicant = { name: '', email: '' };

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.loadJob();
  }

  loadJob(): void {
    this.jobService.getJobById(this.jobId).subscribe(
      (data) => {
        console.log('Fetched job:', data);  // Log job to check the lists
        this.job = data;  // Update the job object
      },
      (error) => console.error('Error fetching job:', error)
    );
  }

  apply(): void {
    if (!this.applicant.name || !this.applicant.email) return;
    
    this.jobService.applyForJob(this.jobId, this.applicant).subscribe(
      (data) => {
        console.log('Application result:', data); // Log the response to check the updated job
        this.job = data.job; // Update job with the new waiting list and hired list
        this.applicant = { name: '', email: '' };
      },
      (error) => console.error('Error applying:', error)
    );
  }
}
