import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './pages/client/client.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from 'src/app/utils/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { ReservasComponent } from './pages/reservas/reservas.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ClientComponent,
    ReservasComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class DashboardModule { }
