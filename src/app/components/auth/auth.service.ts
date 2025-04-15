import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginI } from '../../page/login/interface/login/login';
import { Observable, tap } from 'rxjs';
import { ResponseI } from '../../page/login/interface/login/responseLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://localhost:3000'; // Reemplaza con tu URL real
  private apiUrl = 'http://localhost:8080/api/'; // Reemplaza con tu URL real
  private isAuthenticated: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  login(data: LoginI): Observable<ResponseI> {
    return this.http
      .post<ResponseI>(`${this.apiUrl}auth`, {
        email: data.email,
        password: data.password,
      })
      .pipe(
        tap((response: ResponseI) => {
          if (response.data) {
            this.isAuthenticated = true;
            // this.router.navigate(['/home']);
          }
        })
      );
  }
  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
