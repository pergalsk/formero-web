import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { QuickInfoComponent } from './components/common/quick-info/quick-info.component';
import { interceptorProviders } from './interceptors';
import { FormeroCheckgroupComponent } from './components/blocks/formero-checkgroup/formero-checkgroup.component';
import { FormeroValidationComponent } from './components/blocks/formero-validation/formero-validation.component';
// import { RestrictLengthDirective } from './directives/restrict-length.directive';

@NgModule({
  declarations: [
    AppComponent,
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
    // RestrictLengthDirective
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
