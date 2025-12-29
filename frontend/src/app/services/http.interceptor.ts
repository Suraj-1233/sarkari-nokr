import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Clone the request and add the authorization header if token exists
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Handle the request and catch errors
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized - token expired or invalid
        if (error.status === 401) {
          // Clear token and redirect to login
          this.authService.logout();
          return throwError(() => new Error('Session expired. Please login again.'));
        }
        
        // Handle 403 Forbidden
        if (error.status === 403) {
          return throwError(() => new Error('Access denied. You do not have permission to perform this action.'));
        }
        
        // Handle other errors
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          errorMessage = error.error?.message || error.message || 'Server error occurred';
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}

