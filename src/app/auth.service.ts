import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5000/api/admins/login';

  private isAdminSubject = new BehaviorSubject<boolean>(this.checkIfAdmin());

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('adminToken', response.token);
        this.isAdminSubject.next(true);  
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  getLoginStatus(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  logout(): void {
    localStorage.removeItem('adminToken');
    this.isAdminSubject.next(false);  
  }

  private checkIfAdmin(): boolean {
    return !!localStorage.getItem('adminToken');
  }
}
