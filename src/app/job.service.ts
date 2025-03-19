import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:5000/api/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addJob(job: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, job);
  }

  updateJob(id: string, job: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  applyForJob(id: string, applicant: { name: string; email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/apply`, applicant);
  }

  hireApplicant(id: string, applicant: { name: string; email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/hire`, applicant);
  }

  getJobById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/jobs/${id}`);
  }  
}
