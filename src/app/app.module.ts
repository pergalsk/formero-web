import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormeroTextboxComponent } from './components/formero-textbox/formero-textbox.component';
import { FormeroTextareaComponent } from './components/formero-textarea/formero-textarea.component';
import { FormeroFieldMessagesComponent } from './components/formero-field-messages/formero-field-messages.component';
import { FormeroDropdownComponent } from './components/formero-dropdown/formero-dropdown.component';
import { FormeroRadiogroupComponent } from './components/formero-radiogroup/formero-radiogroup.component';
import { FormeroAgreementComponent } from './components/formero-agreement/formero-agreement.component';
import { FormeroTitleComponent } from './components/formero-title/formero-title.component';
import { FormeroBlocktextComponent } from './components/formero-blocktext/formero-blocktext.component';
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
