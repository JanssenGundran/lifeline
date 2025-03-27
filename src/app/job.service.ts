import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'https://lifelinebackend-czjt.onrender.com/api/jobs'; // ✅ Correct path

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(catchError(this.handleError)); // ✅ Corrected
  }

  addJob(job: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, job).pipe(catchError(this.handleError)); // ✅ Corrected
  }

  updateJob(id: string, job: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, job).pipe(catchError(this.handleError)); // ✅ Corrected
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError)); // ✅ Corrected
  }

  applyForJob(id: string, applicant: { name: string; email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/apply`, applicant).pipe(catchError(this.handleError)); // ✅ Corrected
  }

  hireApplicant(id: string, applicant: { name: string; email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/hire`, applicant).pipe(catchError(this.handleError)); // ✅ Corrected
  }

  getJobById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError)); // ✅ Corrected
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error in JobService:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
