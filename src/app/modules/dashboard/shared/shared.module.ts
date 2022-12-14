import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialModule } from '../../../utils/material/material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
