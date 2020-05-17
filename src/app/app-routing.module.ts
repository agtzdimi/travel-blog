import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { LandmarkDetailsComponent } from './pages/landmark-details/landmark-details.component';
import { AuthGuard } from './theme/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'landmark-details',
    canActivate: [AuthGuard],
    component: LandmarkDetailsComponent,
    pathMatch: 'full',
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
