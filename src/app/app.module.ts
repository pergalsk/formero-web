import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeSk from '@angular/common/locales/sk';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
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
import { FormComponent } from './components/form/form.component';
import { QuickInfoComponent } from './components/common/quick-info/quick-info.component';
import { interceptorProviders } from './interceptors';
import { FormeroCheckgroupComponent } from './components/blocks/formero-checkgroup/formero-checkgroup.component';
import { FormeroValidationComponent } from './components/blocks/formero-validation/formero-validation.component';
import { IndexPageComponent } from './components/pages/index-page/index-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { FormPageComponent } from './components/pages/form-page/form-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
// import { RestrictLengthDirective } from './directives/restrict-length.directive';

// Register the localization
registerLocaleData(localeSk, 'sk-SK');

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
    // RestrictLengthDirective
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    interceptorProviders,
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
