import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = API_ENDPOINTS.BASE_URL;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, user, { responseType: 'text' });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    
    // Basic token expiration check (JWT tokens contain expiration)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      if (Date.now() >= expirationTime) {
        this.logout();
        return false;
      }
      return true;
    } catch (e) {
      // If token is invalid format, remove it
      this.logout();
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
