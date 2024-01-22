import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
  remember: boolean;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

export type SimpleMessageResponse = {
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient: HttpClient = inject(HttpClient);
  userStorageKey = 'user';

  user: User | null = null;

  getCsrfCookie(): Observable<void> {
    return this.httpClient.get<void>('/sanctum/csrf-cookie');
  }

  getUser(): Observable<User> {
    if (this.user) {
      return of(this.user);
    }

    const userStr: string = sessionStorage.getItem(this.userStorageKey);
    const user: User = JSON.parse(userStr);

    if (user) {
      this.user = user;
      return of(user);
    }

    return this.httpClient.get<User>('/api/user').pipe(
      tap((data: User): void => {
        sessionStorage.setItem(this.userStorageKey, JSON.stringify(data));
        this.user = data;
      }),
      // catchError((error: any) => {
      //   debugger;
      //   return of(null);
      // }),
    );
  }

  loginUser(data: LoginUserRequest): Observable<User> {
    return this.ensureCsrfCookie(this.httpClient.post<User>('/login', data));
  }

  logoutUser(): Observable<void | SimpleMessageResponse> {
    // todo: is it necessary to preload CSRF cookie here ?
    this.user = null;
    sessionStorage.removeItem(this.userStorageKey);
    return this.ensureCsrfCookie(this.httpClient.post<void | SimpleMessageResponse>('/logout', {}));
  }

  registerUser(data: RegisterUserRequest): Observable<User> {
    return this.ensureCsrfCookie(this.httpClient.post<User>('/register', data));
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<any> {
    return this.ensureCsrfCookie(this.httpClient.post('/forgot-password', data));
  }

  resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.ensureCsrfCookie(this.httpClient.post('/reset-password', data));
  }

  ensureCsrfCookie<T>(observable: Observable<T>): Observable<T> {
    return this.getCsrfCookie().pipe(concatMap(() => observable));
  }
}
