import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  userLoaded = false;
  user: User | null;

  getUser(): Observable<User> {
    if (this.userLoaded) {
      return of(this.user);
    }

    // todo: handle multiple calls in short time
    return this.httpClient.get<User>('/api/user').pipe(
      tap({
        next: (user: User) => this.setUserStorage(user),
        error: () => this.setUserStorage(null),
      }),
    );
  }

  markAsUnauthenticated(): void {
    this.clearUserStorage();
  }

  isAuthenticated(): Observable<boolean> {
    return this.getUser().pipe(
      map((user: User | null): boolean => !!user?.id),
      catchError((): Observable<boolean> => of(false)),
    );
  }

  isUnauthenticated(): Observable<boolean> {
    return this.isAuthenticated().pipe(map((status: boolean) => !status));
  }

  getCsrfCookie(): Observable<void> {
    return this.httpClient.get<void>('/sanctum/csrf-cookie');
  }

  loginUser(data: LoginUserRequest): Observable<User> {
    return this.ensureCsrfCookie(
      this.httpClient
        .post<User>('/login', data)
        .pipe(tap((user: User) => this.setUserStorage(user))),
    );
  }

  logoutUser(): Observable<void | SimpleMessageResponse> {
    this.clearUserStorage();
    // todo: is it necessary to preload CSRF cookie here ?
    return this.ensureCsrfCookie(this.httpClient.post<void | SimpleMessageResponse>('/logout', {}));
  }

  registerUser(data: RegisterUserRequest): Observable<User> {
    return this.ensureCsrfCookie(
      this.httpClient
        .post<User>('/register', data)
        .pipe(tap((user: User) => this.setUserStorage(user))),
    );
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<any> {
    return this.ensureCsrfCookie(this.httpClient.post('/forgot-password', data));
  }

  resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.ensureCsrfCookie(this.httpClient.post('/reset-password', data));
  }

  ensureCsrfCookie<T>(observable$: Observable<T>): Observable<T> {
    return this.getCsrfCookie().pipe(concatMap(() => observable$));
  }

  private setUserStorage(user?: User): void {
    this.user = user;
    this.userLoaded = true;
  }

  private clearUserStorage(): void {
    this.user = null;
  }
}
