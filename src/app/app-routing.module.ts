import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { FormPageComponent } from './components/pages/form-page/form-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'form/:id', component: FormPageComponent },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
