import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from '@app/interceptors/http-request.interceptor';
import { UnauthorizedInterceptor } from '@app/interceptors/unauthorized.interceptor';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
];
