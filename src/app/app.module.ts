import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeSk from '@angular/common/locales/sk';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { interceptorProviders } from './interceptors';
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
import { FormComponent } from '@components/form/form.component';
import { QuickInfoComponent } from '@components/common/quick-info/quick-info.component';
import { FormeroCheckgroupComponent } from '@components/blocks/formero-checkgroup/formero-checkgroup.component';
import { FormeroValidationComponent } from '@components/blocks/formero-validation/formero-validation.component';
import { IndexPageComponent } from '@components/pages/index-page/index-page.component';
import { HomePageComponent } from '@components/pages/home-page/home-page.component';
import { FormPageComponent } from '@components/pages/form-page/form-page.component';
import { AboutPageComponent } from '@components/pages/about-page/about-page.component';
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
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
  ],
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
