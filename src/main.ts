import {
  enableProdMode,
  APP_INITIALIZER,
  Injector,
  LOCALE_ID,
  DEFAULT_CURRENCY_CODE,
  importProvidersFrom,
} from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxColorSchemesService, NgxColorSchemesModule } from 'ngx-color-schemes';

import { environment } from './environments/environment';

import { IndexPageComponent } from '@components/pages/index-page/index-page.component';
import { interceptorProviders } from '@app/interceptors';
import { authInterceptorProviders } from '@auth/interceptors';
import { schemaBlocksProviders } from '@app/schema/schema-blocks-injection-token';
import { routes } from '@app/routes';

function colorSchemesInitializer(injector: Injector) {
  return (): void => {
    injector.get(NgxColorSchemesService).setPreferredScheme();
  };
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(IndexPageComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      NgxColorSchemesModule.forRoot({
        lightSchemeClass: 'color-scheme-light',
        darkSchemeClass: 'color-scheme-dark',
        storageKey: 'color-scheme-preference',
      }),
    ),
    interceptorProviders,
    authInterceptorProviders,
    schemaBlocksProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: colorSchemesInitializer,
      deps: [Injector],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'sk-SK',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR',
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
