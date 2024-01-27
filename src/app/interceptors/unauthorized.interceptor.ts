import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (res: HttpErrorResponse) => {
          if (res.status === HttpStatusCode.Unauthorized) {
            this.authService.markAsUnauthenticated();
          }
        },
      }),
    );
  }
}
