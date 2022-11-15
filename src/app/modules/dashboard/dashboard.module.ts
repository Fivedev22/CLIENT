import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './pages/client/client.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from 'src/app/utils/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { ForeignPipe } from './pages/client/pipes/foreign.pipe';
import { ProvincePipe } from './pages/client/pipes/province.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DialogComponent } from './pages/client/dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DashboardComponent,
    ClientComponent,
    ReservasComponent,
    AdminComponent,
    DialogComponent,
    ForeignPipe,
    ProvincePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
