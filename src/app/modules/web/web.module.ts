import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponent } from './web.component';
import { MaterialModule } from 'src/app/utils/material/material.module';



@NgModule({
  declarations: [
    WebComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class WebModule { }
