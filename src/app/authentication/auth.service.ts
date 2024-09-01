import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44348'; // Replace with your API URL
  private userDetailsSubject = new BehaviorSubject<{username: string, email: string} | null>(null);
  userDetails = this.userDetailsSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    const username = credentials.username;
    const password = credentials.password;

    return this.http.post<any>(`${this.apiUrl}/api/Login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          // Store JWT token
          localStorage.setItem('jwtToken', response.token);

          // Store user details
          this.setUserDetails(response.userDetails.username, response.userDetails.email);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  setUserDetails(username: string, email: string): void {
    this.userDetailsSubject.next({ username, email });
  }
}
