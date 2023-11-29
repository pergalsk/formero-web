import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  LOCALE_ID,
  DEFAULT_CURRENCY_CODE,
  APP_INITIALIZER,
  Injector,
} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeSk from '@angular/common/locales/sk';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interceptorProviders } from './interceptors';
import { AppRoutingModule } from './app-routing.module';
import { NgxColorSchemesModule, NgxColorSchemesService } from 'ngx-color-schemes';
import {
  FormeroTextboxComponent,
  FormeroTextareaComponent,
  FormeroFieldMessagesComponent,
  FormeroDropdownComponent,
  FormeroRadiogroupComponent,
  FormeroAgreementComponent,
  FormeroTitleComponent,
  FormeroBlocktextComponent,
} from './components';
import { FormComponent } from '@components/form/form.component';
import { QuickInfoComponent } from '@components/common/quick-info/quick-info.component';
import { FormeroCheckgroupComponent } from '@components/blocks/formero-checkgroup/formero-checkgroup.component';
import { FormeroValidationComponent } from '@components/blocks/formero-validation/formero-validation.component';
import { IndexPageComponent } from '@components/pages/index-page/index-page.component';
import { HomePageComponent } from '@components/pages/home-page/home-page.component';
import { FormPageComponent } from '@components/pages/form-page/form-page.component';
import { AboutPageComponent } from '@components/pages/about-page/about-page.component';
import { PanelComponent } from '@components/ui/panel/panel.component';
// import { RestrictLengthDirective } from './directives/restrict-length.directive';

// Register the localization
registerLocaleData(localeSk, 'sk-SK');

function colorSchemesInitializer(injector: Injector) {
  return (): void => {
    injector.get(NgxColorSchemesService).setPreferredScheme();
  };
}

@NgModule({
  declarations: [
    FormComponent,
    FormeroTextboxComponent,
    FormeroTextareaComponent,
    FormeroFieldMessagesComponent,
    FormeroDropdownComponent,
    FormeroRadiogroupComponent,
    FormeroAgreementComponent,
    FormeroTitleComponent,
    FormeroBlocktextComponent,
    QuickInfoComponent,
    FormeroCheckgroupComponent,
    FormeroValidationComponent,
    IndexPageComponent,
    HomePageComponent,
    FormPageComponent,
    AboutPageComponent,
    PanelComponent,
    // RestrictLengthDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxColorSchemesModule.forRoot({
      lightSchemeClass: 'color-scheme-light',
      darkSchemeClass: 'color-scheme-dark',
      storageKey: 'color-scheme-preference',
    }),
  ],
  providers: [
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
  ],
  bootstrap: [IndexPageComponent],
})
export class AppModule {}
