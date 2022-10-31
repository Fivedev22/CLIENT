import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ClientComponent } from './modules/dashboard/pages/client/client.component';


const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ClientComponent
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
