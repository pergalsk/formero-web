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
    // RestrictLengthDirective
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
