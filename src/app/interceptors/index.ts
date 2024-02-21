import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from '@app/interceptors/http-request.interceptor';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
