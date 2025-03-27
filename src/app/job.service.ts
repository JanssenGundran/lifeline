import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'https://lifelinebackend-czjt.onrender.com/api/jobs';  

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(catchError(this.handleError));
  }

  addJob(job: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}`, job, { headers }).pipe(catchError(this.handleError));
  }

  updateJob(id: string, job: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, job, { headers }).pipe(catchError(this.handleError));
  }

  deleteJob(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers }).pipe(catchError(this.handleError));
  }

  applyForJob(id: string, applicant: { name: string; email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/apply`, applicant).pipe(catchError(this.handleError));
  }

  hireApplicant(id: string, applicant: { name: string; email: string }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/${id}/hire`, applicant, { headers })
      .pipe(catchError(this.handleError));
  }

  getJobById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken');
    console.log("Auth Token Sent:", token);  
    return new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error in JobService:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
