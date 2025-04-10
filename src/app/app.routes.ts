import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { HomePageComponent } from './page/home-page/home-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'home', component: HomePageComponent,
    children: [
      { path: '', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
