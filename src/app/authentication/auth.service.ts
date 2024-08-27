import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44348'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    const username = credentials.username;
    const password = credentials.password;

    return this.http.post<any>(`${this.apiUrl}/api/Login`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
