import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UnauthorizedInterceptor } from '@auth/interceptors/unauthorized.interceptor';

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
];
