import {
  enableProdMode,
  APP_INITIALIZER,
  Injector,
  LOCALE_ID,
  DEFAULT_CURRENCY_CODE,
  importProvidersFrom,
} from '@angular/core';
import { environment } from './environments/environment';
import { IndexPageComponent } from '@components/pages/index-page/index-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { NgxColorSchemesService, NgxColorSchemesModule } from 'ngx-color-schemes';
import { interceptorProviders } from '@app/interceptors';

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
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgxColorSchemesModule.forRoot({
        lightSchemeClass: 'color-scheme-light',
        darkSchemeClass: 'color-scheme-dark',
        storageKey: 'color-scheme-preference',
      }),
    ),
    interceptorProviders,
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
  ],
}).catch((err) => console.error(err));
