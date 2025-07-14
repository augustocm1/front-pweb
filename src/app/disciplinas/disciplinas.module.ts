import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinasFormComponent } from './disciplinas-form/disciplinas-form.component';
import { DisciplinasListComponent } from './disciplinas-list/disciplinas-list.component';
import { DisciplinasRoutingModule } from './disciplinas-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DisciplinasFormComponent,
    DisciplinasListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DisciplinasRoutingModule,
    FormsModule
  ],
  exports: [
    DisciplinasFormComponent,
    DisciplinasListComponent
  ]
})
export class DisciplinasModule { }
