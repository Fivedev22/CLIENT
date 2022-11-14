import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { ForgotPasswordComponent } from './modules/auth/pages/forgot-password/forgot-password.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { ResetPasswordComponent } from './modules/auth/pages/reset-password/reset-password.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ClientComponent } from './modules/dashboard/pages/client/client.component';
import { ReservasComponent } from './modules/dashboard/pages/reservas/reservas.component';
import { WebComponent } from './modules/web/web.component';


const routes: Routes = [
  {
    path: '',
    component: WebComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'password-reset/:token',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'cliente',
        component: ClientComponent
      },
      {
        path: 'reserva',
        component: ReservasComponent
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
