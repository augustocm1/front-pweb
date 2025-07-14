import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoresListComponent } from './professores-list/professores-list.component';
import { ProfessoresFormComponent } from './professores-form/professores-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfessoresRoutingModule } from './professores-routing.module';



@NgModule({
  declarations: [
    ProfessoresListComponent,
    ProfessoresFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfessoresRoutingModule
  ],
  exports: [
    ProfessoresListComponent,
    ProfessoresFormComponent
  ]
})
export class ProfessoresModule { }
